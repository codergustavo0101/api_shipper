import { Injectable } from '@nestjs/common';
import PricesEntity from './entities/prices.entity';

@Injectable()
export class PricesService {
  async findAll(): Promise<PricesEntity[]> {
    return await PricesEntity.find();
  }
}
