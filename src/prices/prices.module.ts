import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import PricesEntity from './entities/prices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricesEntity])],
  providers: [PricesService],
  controllers: [PricesController],
})
export class PricesModule {}
