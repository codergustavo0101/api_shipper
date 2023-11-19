import { Module } from '@nestjs/common';
import { ReportedService } from './reported.service';
import { ReportedController } from './reported.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ReportedEntity from './entities/reported.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportedEntity])],
  controllers: [ReportedController],
  providers: [ReportedService],
})
export class ReportedModule {}
