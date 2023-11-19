import { Injectable, NotFoundException } from '@nestjs/common';
import UpdateProfileDto from './dto/update-profile.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  async findOne(id: string): Promise<UserEntity> {
    const user = await UserEntity.createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photos')
      .where('user.id = :id', { id })
      .orderBy('photos.order', 'ASC')
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(
    id: string,
    data: Partial<UpdateProfileDto>,
  ): Promise<{
    success: boolean;
  }> {
    const user = await this.findOne(id);

    Object.assign(user, data);

    await user.save();

    return {
      success: true,
    };
  }

  async delete(id: string): Promise<{
    success: boolean;
  }> {
    try {
      const user = await UserEntity.findOneOrFail({
        where: {
          id,
        },
        relations: [
          'photos',
          'referralCode',
          'preferences',
          'otherInformation',
          'matchRanksFrom',
          'matchRanksTo',
          'profileRanksFrom',
          'profileRanksTo',
          'matchUserOne',
          'matchUserTwo',
          'reportedUser',
          'reportedUsers',
          'auth',
        ],
      });

      user.photos.map(async (photo) => {
        await photo.remove();
      });

      await user.preferences.remove();

      user.otherInformation.map(async (otherInformation) => {
        await otherInformation.remove();
      });

      if (user.referralCode) await user.referralCode.remove();

      user.profileRanksFrom.map(async (profileRank) => {
        await profileRank.remove();
      });

      user.profileRanksTo.map(async (profileRank) => {
        await profileRank.remove();
      });

      user.matchRanksFrom.map(async (matchRank) => {
        await matchRank.remove();
      });

      user.matchRanksTo.map(async (matchRank) => {
        await matchRank.remove();
      });

      user.matchUserOne.map(async (match) => {
        await match.remove();
      });

      user.matchUserTwo.map(async (match) => {
        await match.remove();
      });

      user.reportedUser.map(async (reported) => {
        await reported.remove();
      });

      user.reportedUsers.map(async (reported) => {
        await reported.remove();
      });

      await user.auth.remove();
      await user.remove();

      return {
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
