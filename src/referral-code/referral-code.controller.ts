import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import FindReferralDto from './dto/find-referral.dto';
import { ReferralCodeService } from './referral-code.service';

@ApiTags('referral-code')
@Controller('referral-code')
export class ReferralCodeController {
  constructor(private readonly referralCodeService: ReferralCodeService) {}

  @Public()
  @Get('/find/:referralCode')
  findReferralCode(@Param() findReferralDto: FindReferralDto): Promise<{
    success: boolean;
    data: {
      id: string;
      name: string;
    };
  }> {
    return this.referralCodeService.findReferralCode(findReferralDto);
  }
}
