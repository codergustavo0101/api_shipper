import { Body, Controller, Delete, Get, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import UpdateProfileDto from './dto/update-profile.dto';
import { EstablishmentService } from './establishment.service';

@ApiTags('establishment')
@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @ApiBearerAuth()
  @Get('/profile')
  async getProfile(@Req() req) {
    return this.establishmentService.findOne(req.user.userId);
  }

  @ApiBearerAuth()
  @Put('/profile')
  async updateProfile(
    @Req() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<{
    success: boolean;
  }> {
    return this.establishmentService.update(req.user.userId, updateProfileDto);
  }

  @ApiBearerAuth()
  @Delete()
  async deleteEstablishment(@Req() req): Promise<{
    success: boolean;
  }> {
    return this.establishmentService.delete(req.user.userId);
  }
}
