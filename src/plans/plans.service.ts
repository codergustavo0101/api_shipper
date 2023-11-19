import { Injectable } from '@nestjs/common';
import PlansEntity from './entities/plans.entity';

@Injectable()
export class PlansService {
  async getPlans(): Promise<PlansEntity[]> {
    return await PlansEntity.find();
  }
}
