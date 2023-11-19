import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import PlansEntity from './entities/plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlansEntity])],
  providers: [PlansService],
  controllers: [PlansController],
})
export class PlansModule {}
