import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import UpdatePreferencesDto from './dto/update-preferences.dto';
import PreferencesEntity from './entities/preferences.entity';

@Injectable()
export class PreferencesService {
  async update(
    userId: string,
    updatePreferencesDto: UpdatePreferencesDto,
  ): Promise<{
    success: boolean;
  }> {
    try {
      const user = await UserEntity.findOneOrFail({
        where: {
          id: userId,
        },
        relations: ['preferences'],
      });

      if (user.preferences) {
        Object.assign(user.preferences, updatePreferencesDto);
        await user.preferences.save();
      } else {
        const newPreferences = new PreferencesEntity();

        Object.assign(newPreferences, updatePreferencesDto);
        newPreferences.user = user;

        await newPreferences.save();
      }

      return {
        success: true,
      };
    } catch (error) {
      switch (error.code) {
        case '23503':
          throw new NotFoundException('User not found');
        default:
          throw error;
      }
    }
  }

  async findOne(userId: string): Promise<PreferencesEntity> {
    const user = await UserEntity.findOneOrFail({
      where: {
        id: userId,
      },
      relations: ['preferences'],
    });

    return user.preferences;
  }
}
