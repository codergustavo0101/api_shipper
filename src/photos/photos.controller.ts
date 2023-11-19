import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import MenuDto from './dto/menu.dto';
import ProfilePictureDto from './dto/profile-picture.dto';
import RemoveProfilePictureDto from './dto/remove-profile-picture.dto';
import { PhotosService } from './photos.service';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @ApiBearerAuth()
  @Post('/profile-picture')
  async updateProfilePicture(
    @Req() req,
    @Body() profilePictureDto: ProfilePictureDto,
  ) {
    const contentLength = req.headers['content-length'];

    return await this.photosService.updateProfilePicture(
      req.user,
      profilePictureDto,
      contentLength,
    );
  }

  @ApiBearerAuth()
  @Post('/menu')
  async updateMenu(@Req() req, @Body() menuDto: MenuDto) {
    const contentLength = req.headers['content-length'];

    return await this.photosService.updateMenu(
      req.user,
      menuDto,
      contentLength,
    );
  }

  @ApiBearerAuth()
  @Delete('/profile-picture/:order')
  async removeProfilePicture(
    @Req() req,
    @Param() removeProfilePictureDto: RemoveProfilePictureDto,
  ) {
    return await this.photosService.removeProfilePicture(
      req.user,
      removeProfilePictureDto,
    );
  }
}
