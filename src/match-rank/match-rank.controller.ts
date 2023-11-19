import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RankMatchDto from './dto/rank-match.dto';
import { MatchRankService } from './match-rank.service';

@ApiTags('match-rank')
@Controller('match-rank')
export class MatchRankController {
  constructor(private readonly matchRankService: MatchRankService) {}

  @ApiBearerAuth()
  @Post('/')
  async rank(@Req() req, @Body() rankMatchDto: RankMatchDto) {
    return await this.matchRankService.rankMatch(req.user.userId, rankMatchDto);
  }
}
