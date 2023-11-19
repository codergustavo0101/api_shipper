import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import PlansEntity from './entities/plans.entity';
import { PlansService } from './plans.service';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @ApiBearerAuth()
  @Get()
  getPlans(): Promise<PlansEntity[]> {
    return this.plansService.getPlans();
  }
}
