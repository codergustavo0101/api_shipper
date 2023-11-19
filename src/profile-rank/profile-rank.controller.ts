import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RankProfileDto from './dto/rank-profile.dto';
import { ProfileRankService } from './profile-rank.service';

@ApiTags('profile-rank')
@Controller('profile-rank')
export class ProfileRankController {
  constructor(private readonly profileRankService: ProfileRankService) {}

  @ApiBearerAuth()
  @Post('/')
  async rank(@Req() req, @Body() rankProfileDto: RankProfileDto) {
    return await this.profileRankService.rankProfile(
      req.user.userId,
      rankProfileDto,
    );
  }
}
