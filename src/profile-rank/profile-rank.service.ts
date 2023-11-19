import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import RankProfileDto from './dto/rank-profile.dto';
import { ProfileRankEntity } from './entities/profile-rank.entity';

@Injectable()
export class ProfileRankService {
  async rankProfile(userId: string, rankProfileDto: RankProfileDto) {
    if (userId === rankProfileDto.id)
      throw new NotAcceptableException('UserTo cannot be the same as UserFrom');

    try {
      const promises = [];

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
            id: rankProfileDto.id,
          },
        }),
      );

      const [userFrom, userTo] = await Promise.all(promises);

      const existingRank = await ProfileRankEntity.findOne({
        where: {
          userFrom: userFrom,
          userTo: userTo,
        },
        relations: ['userFrom', 'userTo'],
      });

      if (existingRank) {
        existingRank.rank = rankProfileDto.rank;
        await existingRank.save();
      } else {
        const newRank = new ProfileRankEntity();

        newRank.userFrom = userFrom;
        newRank.userTo = userTo;
        newRank.rank = rankProfileDto.rank;

        await newRank.save();
      }

      const userToFull = userTo as UserEntity;

      const query = ProfileRankEntity.createQueryBuilder('profile_rank');
      query.where('profile_rank.user_to = :userId', { userId: userToFull.id });
      query.select('AVG(rank)', 'avg');

      const average = (await query.getRawOne()) as { avg: string };

      userToFull.profileRank = Number(average.avg);
      await userToFull.save();

      return {
        success: true,
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
