import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralCodeController } from './referral-code.controller';
import { ReferralCodeService } from './referral-code.service';
import ReferralCodeEntity from './entities/referral-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferralCodeEntity])],
  controllers: [ReferralCodeController],
  providers: [ReferralCodeService],
})
export class ReferralCodeModule {}
