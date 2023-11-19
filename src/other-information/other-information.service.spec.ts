import { Test, TestingModule } from '@nestjs/testing';
import { OtherInformationService } from './other-information.service';

describe('OtherInformationService', () => {
  let service: OtherInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherInformationService],
    }).compile();

    service = module.get<OtherInformationService>(OtherInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
