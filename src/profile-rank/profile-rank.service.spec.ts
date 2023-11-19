import { Test, TestingModule } from '@nestjs/testing';
import { ProfileRankService } from './profile-rank.service';

describe('ProfileRankService', () => {
  let service: ProfileRankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileRankService],
    }).compile();

    service = module.get<ProfileRankService>(ProfileRankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
