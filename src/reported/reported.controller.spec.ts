import { Test, TestingModule } from '@nestjs/testing';
import { ReportedController } from './reported.controller';
import { ReportedService } from './reported.service';

describe('ReportedController', () => {
  let controller: ReportedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportedController],
      providers: [ReportedService],
    }).compile();

    controller = module.get<ReportedController>(ReportedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
