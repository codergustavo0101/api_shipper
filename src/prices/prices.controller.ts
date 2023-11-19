import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PricesEntity from './entities/prices.entity';
import { PricesService } from './prices.service';

@ApiTags('prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @ApiBearerAuth()
  @Get()
  findAll(): Promise<PricesEntity[]> {
    return this.pricesService.findAll();
  }
}
