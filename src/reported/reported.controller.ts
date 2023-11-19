import { Body, Controller, Post, Req } from '@nestjs/common';
import { ReportedService } from './reported.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ReportUserDto from './dto/report-user.dto';

@ApiTags('reported')
@Controller('reported')
export class ReportedController {
  constructor(private readonly reportedService: ReportedService) {}

  @ApiBearerAuth()
  @Post('/')
  reportUser(@Req() req, @Body() reportUserDto: ReportUserDto) {
    return this.reportedService.reportUser(req.user.userId, reportUserDto);
  }
}
