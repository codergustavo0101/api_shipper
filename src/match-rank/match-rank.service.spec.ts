import { Test, TestingModule } from '@nestjs/testing';
import { MatchRankService } from './match-rank.service';

describe('MatchRankService', () => {
  let service: MatchRankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchRankService],
    }).compile();

    service = module.get<MatchRankService>(MatchRankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
