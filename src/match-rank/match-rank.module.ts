import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchRankEntity } from './entities/match-rank.entity';
import { MatchRankController } from './match-rank.controller';
import { MatchRankService } from './match-rank.service';

@Module({
  imports: [TypeOrmModule.forFeature([MatchRankEntity])],
  controllers: [MatchRankController],
  providers: [MatchRankService],
})
export class MatchRankModule {}
