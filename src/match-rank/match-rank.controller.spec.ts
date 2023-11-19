import { Test, TestingModule } from '@nestjs/testing';
import { MatchRankController } from './match-rank.controller';

describe('MatchRankController', () => {
  let controller: MatchRankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchRankController],
    }).compile();

    controller = module.get<MatchRankController>(MatchRankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
