import { Injectable, NotFoundException } from '@nestjs/common';
import FindReferralDto from './dto/find-referral.dto';
import ReferralCodeEntity from './entities/referral-code.entity';

@Injectable()
export class ReferralCodeService {
  async findReferralCode(findReferralDto: FindReferralDto): Promise<{
    success: boolean;
    data: {
      id: string;
      name: string;
    };
  }> {
    const { referralCode } = findReferralDto;

    try {
      const referral = await ReferralCodeEntity.findOneOrFail({
        where: { code: referralCode },
        relations: ['user'],
      });

      return {
        success: true,
        data: {
          id: referral.user.id,
          name: referral.user.name,
        },
      };
    } catch (error) {
      throw new NotFoundException('Referral code not found');
    }
  }
}
