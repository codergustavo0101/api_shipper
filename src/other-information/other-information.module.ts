import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherInformationController } from './other-information.controller';
import { OtherInformationService } from './other-information.service';
import OtherInformationEntity from './entities/other-information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtherInformationEntity])],
  controllers: [OtherInformationController],
  providers: [OtherInformationService],
})
export class OtherInformationModule {}
