import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsEntity } from './entities/coupons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponsEntity])],
})
export class CouponsModule {}
