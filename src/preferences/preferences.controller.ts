import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import UpdatePreferencesDto from './dto/update-preferences.dto';
import PreferencesEntity from './entities/preferences.entity';
import { PreferencesService } from './preferences.service';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @ApiBearerAuth()
  @Put()
  async updatePreferences(
    @Req() req,
    @Body() updatePreferencesDto: UpdatePreferencesDto,
  ): Promise<{
    success: boolean;
  }> {
    return this.preferencesService.update(
      req.user.userId,
      updatePreferencesDto,
    );
  }

  @ApiBearerAuth()
  @Get()
  async getPreferences(@Req() req): Promise<PreferencesEntity> {
    return this.preferencesService.findOne(req.user.userId);
  }
}
