import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentEntity } from './entities/establishment.entity';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentService } from './establishment.service';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstablishmentEntity]),
    HttpModule,
    LocationModule,
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
})
export class EstablishmentModule {}
