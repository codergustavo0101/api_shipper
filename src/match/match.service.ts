import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import MatchEntity from './entities/match.entity';
import LikeUserDto from './dto/like-user.dto';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class MatchService {
  constructor(private readonly socketGateway: SocketGateway) {}
  async likeUser(userId: string, likeUserDto: LikeUserDto) {
    const promises = [];

    if (userId === likeUserDto.id)
      throw new NotAcceptableException('You cannot like yourself');

    try {
      promises.push(
        UserEntity.findOneOrFail({
          where: {
            id: userId,
          },
        }),
      );

      promises.push(
        UserEntity.findOneOrFail({
          where: {
            id: likeUserDto.id,
          },
        }),
      );

      const [currentUser, matchUser] = await Promise.all(promises);

      const findMatchOne = await MatchEntity.findOne({
        where: {
          userOne: matchUser,
          userTwo: currentUser,
        },
      });

      if (findMatchOne) {
        if (findMatchOne.status === 'MATCH')
          throw new NotAcceptableException(
            'You are already a match for this user',
          );

        findMatchOne.status = 'MATCH';

        await findMatchOne.save();

        const newMatch = new MatchEntity();
        newMatch.userOne = currentUser;
        newMatch.userTwo = matchUser;
        newMatch.status = 'MATCH';

        await newMatch.save();

        // TODO: Add a chance to contain a coupon on the match

        this.socketGateway.notifyMatch(currentUser.id, matchUser.id, {
          status: 'MATCH',
          user: matchUser,
        });
      } else {
        const findMatchTwo = await MatchEntity.findOne({
          where: {
            userOne: currentUser,
            userTwo: matchUser,
            status: 'LIKED',
          },
        });

        if (findMatchTwo) return;

        const newMatch = new MatchEntity();
        newMatch.userOne = currentUser;
        newMatch.userTwo = matchUser;
        newMatch.status = 'LIKED';

        await newMatch.save();
      }

      return {
        success: true,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getPossibleMatches(userId: string) {
    try {
      const currentUser = await UserEntity.findOneOrFail({
        where: {
          id: userId,
        },
        relations: ['matchUserOne', 'matchUserOne.userTwo', 'preferences'],
      });

      const { lat, lng, preferences } = currentUser;

      const matchUserIds = currentUser.matchUserOne.map(
        (match) => match.userTwo.id,
      );

      const query = UserEntity.createQueryBuilder('user');

      if (matchUserIds.length === 0) {
        query.where('user.id != :userId', { userId });
      } else {
        query
          .where('user.id != :userId', { userId })
          .andWhere('user.id NOT IN (:...matchUserIds)', { matchUserIds });
      }

      query
        .andWhere('user.incognito = false')
        .leftJoinAndSelect('user.preferences', 'preferences')
        .leftJoinAndSelect('user.photos', 'photos')
        .leftJoinAndSelect('user.otherInformation', 'otherInformation');
      // TODO: adds checkins to the query later

      if (preferences) {
        const {
          minAgePreference,
          maxAgePreference,
          sexPreference,
          maxDistance,
        } = preferences;

        query.andWhere('user.birthDate <= :maxAge', {
          maxAge: new Date(
            new Date().setFullYear(new Date().getFullYear() - minAgePreference),
          ),
        });

        query.andWhere('user.birthDate >= :minAge', {
          minAge: new Date(
            new Date().setFullYear(new Date().getFullYear() - maxAgePreference),
          ),
        });

        if (sexPreference !== 'BOTH') {
          query.andWhere('user.gender = :sexPreference', {
            sexPreference,
          });
        }

        query.andWhere(
          '6371 * acos(cos(radians(:lat)) * cos(radians(user.lat)) * cos(radians(user.lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(user.lat))) <= :maxDistance',
          {
            lat,
            lng,
            maxDistance,
          },
        );
      }

      const possibleMatches = await query.orderBy('RAND()').limit(20).getMany();

      possibleMatches.forEach((user) => {
        const distance = Math.round(
          6371 *
            Math.acos(
              Math.cos((lat * Math.PI) / 180) *
                Math.cos((user.lat * Math.PI) / 180) *
                Math.cos(((user.lng - lng) * Math.PI) / 180) +
                Math.sin((lat * Math.PI) / 180) *
                  Math.sin((user.lat * Math.PI) / 180),
            ),
        );

        const age = Math.floor(
          (new Date().getTime() - new Date(user.birthdate).getTime()) /
            3.15576e10,
        );

        const city = user.preferences?.city || '';

        const imgs = user.photos.map((photo) => photo.photoUrl);

        user.distance = distance;
        user.age = age;
        user.city = city;
        user.img = imgs;
      });

      return possibleMatches;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('No user found');
    }
  }
}
