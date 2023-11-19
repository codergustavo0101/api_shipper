import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import RankMatchDto from './dto/rank-match.dto';
import { MatchRankEntity } from './entities/match-rank.entity';
import MatchEntity from 'src/match/entities/match.entity';

@Injectable()
export class MatchRankService {
  async rankMatch(userId: string, rankMatchDto: RankMatchDto) {
    if (userId === rankMatchDto.id)
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
            id: rankMatchDto.id,
          },
        }),
      );

      const [userFrom, userTo] = await Promise.all(promises);

      await MatchEntity.findOneOrFail({
        where: {
          userOne: userFrom,
          userTwo: userTo,
          status: 'MATCH',
        },
      });

      const existingRank = await MatchRankEntity.findOne({
        where: {
          userFrom: userFrom,
          userTo: userTo,
        },
        relations: ['userFrom', 'userTo'],
      });

      if (existingRank) {
        existingRank.rank = rankMatchDto.rank;
        await existingRank.save();
      } else {
        const newRank = new MatchRankEntity();

        newRank.userFrom = userFrom;
        newRank.userTo = userTo;
        newRank.rank = rankMatchDto.rank;

        await newRank.save();
      }

      const userToFull = userTo as UserEntity;

      const query = MatchRankEntity.createQueryBuilder('profile_rank');
      query.where('profile_rank.user_to = :userId', { userId: userToFull.id });
      query.select('AVG(rank)', 'avg');

      const average = (await query.getRawOne()) as { avg: string };

      userToFull.matchRank = Number(average.avg);
      await userToFull.save();

      return {
        success: true,
      };
    } catch (error) {
      throw new NotAcceptableException('Error while processing information');
    }
  }
}
