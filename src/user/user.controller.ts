import { Body, Controller, Delete, Get, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import UpdateProfileDto from './dto/update-profile.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/profile')
  async getProfile(@Req() req): Promise<UserEntity> {
    return this.userService.findOne(req.user.userId);
  }

  @ApiBearerAuth()
  @Put('/profile')
  async updateProfile(
    @Req() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<{
    success: boolean;
  }> {
    return this.userService.update(req.user.userId, updateProfileDto);
  }

  @ApiBearerAuth()
  @Delete()
  async deleteUser(@Req() req): Promise<{
    success: boolean;
  }> {
    return this.userService.delete(req.user.userId);
  }
}
