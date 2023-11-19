import { Test, TestingModule } from '@nestjs/testing';
import { OtherInformationController } from './other-information.controller';

describe('OtherInformationController', () => {
  let controller: OtherInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherInformationController],
    }).compile();

    controller = module.get<OtherInformationController>(OtherInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
