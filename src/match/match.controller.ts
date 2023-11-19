import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MatchService } from './match.service';
import LikeUserDto from './dto/like-user.dto';

@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @ApiBearerAuth()
  @Post('/like')
  async likeUser(@Req() req, @Body() likeUserDto: LikeUserDto) {
    return await this.matchService.likeUser(req.user.userId, likeUserDto);
  }

  @ApiBearerAuth()
  @Get('/user-list')
  async getPossibleMatches(@Req() req) {
    return await this.matchService.getPossibleMatches(req.user.userId);
  }
}
