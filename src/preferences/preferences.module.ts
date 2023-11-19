import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import OtherInformationEntity from 'src/other-information/entities/other-information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtherInformationEntity])],
  providers: [PreferencesService],
  controllers: [PreferencesController],
})
export class PreferencesModule {}
