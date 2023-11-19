import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import UpdateOtherInformationDto from './dto/update.other-information.dto';
import OtherInformationEntity from './entities/other-information.entity';
import { OtherInformationService } from './other-information.service';

@ApiTags('other-information')
@Controller('other-information')
export class OtherInformationController {
  constructor(
    private readonly otherInformationService: OtherInformationService,
  ) {}

  @ApiBearerAuth()
  @Put()
  async updateOtherInformation(
    @Req() req,
    @Body() updateOtherInformationDto: UpdateOtherInformationDto,
  ): Promise<{
    success: boolean;
  }> {
    return this.otherInformationService.update(
      req.user.userId,
      updateOtherInformationDto,
    );
  }

  @ApiBearerAuth()
  @Get()
  async getOtherInformation(@Req() req): Promise<OtherInformationEntity[]> {
    return this.otherInformationService.findAll(req.user.userId);
  }
}
