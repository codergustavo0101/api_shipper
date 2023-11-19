import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import OtherInformationEntity from 'src/other-information/entities/other-information.entity';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([OtherInformationEntity]), StorageModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
