import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import UpdateOtherInformationDto from './dto/update.other-information.dto';
import OtherInformationEntity from './entities/other-information.entity';

@Injectable()
export class OtherInformationService {
  async update(
    userId: string,
    updateOtherInformationDto: UpdateOtherInformationDto,
  ): Promise<{
    success: boolean;
  }> {
    try {
      const user = await UserEntity.findOneOrFail({
        where: {
          id: userId,
        },
        relations: ['otherInformation'],
      });

      const alreadyAnswered = [] as string[];

      user.otherInformation.forEach((otherInformation) => {
        alreadyAnswered.push(otherInformation.question);
      });

      if (alreadyAnswered.indexOf(updateOtherInformationDto.question) > -1) {
        const otherInformation = user.otherInformation.find(
          (otherInformation) =>
            otherInformation.question === updateOtherInformationDto.question,
        );

        Object.assign(otherInformation, updateOtherInformationDto);

        await otherInformation.save();
      } else {
        const newOtherInformation = new OtherInformationEntity();

        Object.assign(newOtherInformation, updateOtherInformationDto);
        newOtherInformation.user = user;

        await newOtherInformation.save();
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

  async findAll(userId: string): Promise<OtherInformationEntity[]> {
    const user = await UserEntity.findOneOrFail({
      where: {
        id: userId,
      },
      relations: ['otherInformation'],
    });

    return user.otherInformation;
  }
}
