import { Test, TestingModule } from '@nestjs/testing';
import { ProfileRankController } from './profile-rank.controller';

describe('ProfileRankController', () => {
  let controller: ProfileRankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileRankController],
    }).compile();

    controller = module.get<ProfileRankController>(ProfileRankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
