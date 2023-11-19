import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class FindReferralDto {
  @ApiProperty({
    description: 'Referral Code',
    example: 'FirQx7v3J4f',
  })
  @IsNotEmpty()
  @IsString()
  referralCode: string;
}
