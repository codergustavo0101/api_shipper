import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { StorageService, UploadedFile } from 'src/storage/storage.service';
import { UserEntity } from 'src/user/entities/user.entity';
import ProfilePictureDto from './dto/profile-picture.dto';
import RemoveProfilePictureDto from './dto/remove-profile-picture.dto';
import PhotosEntity, { PhotoType } from './entities/photos.entity';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity';
import MenuDto from './dto/menu.dto';

@Injectable()
export class PhotosService {
  constructor(private readonly storageService: StorageService) {}

  async updateProfilePicture(
    user: {
      userId?: string;
      establishmentId?: string;
      type: 'user' | 'establishment';
    },
    profilePictureDto: ProfilePictureDto,
    contentLength: any,
  ): Promise<{ photo_url: string }> {
    const tenMegaBytes = 10 * 1024 * 1024;

    if (contentLength > tenMegaBytes) {
      throw new Error('File size is too big');
    }

    const newPhoto = new PhotosEntity();

    if (user.type === 'user') {
      const userEntity = await UserEntity.findOne({
        where: { id: user.userId },
      });

      newPhoto.user = userEntity;
      newPhoto.order = profilePictureDto.order;
    } else if (user.type === 'establishment') {
      const establishmentEntity = await EstablishmentEntity.findOne({
        where: { id: user.establishmentId },
      });

      newPhoto.establishment = establishmentEntity;
    }

    const { file } = profilePictureDto;

    const fileName = `${uuidv4()}.png`;
    const folder = 'profile-pictures';
    const buf = Buffer.from(file, 'base64');

    const uploadedFile: UploadedFile = {
      fileName,
      folder,
      buffer: buf,
    };

    const publicUrl = await this.storageService.uploadFile(uploadedFile);

    newPhoto.photoUrl = publicUrl;

    try {
      if (user.type === 'establishment') {
        const currentProfilePicture = await PhotosEntity.findOne({
          where: {
            establishment: {
              id: user.establishmentId,
            },
            type: PhotoType.PROFILE_PICTURE,
          },
        });

        if (currentProfilePicture)
          await this.removeProfilePicture(user, {
            order: currentProfilePicture.order,
          });
      }

      await newPhoto.save();
    } catch (error) {
      console.log(error);
      throw new Error('Error updating user profile picture');
    }

    return { photo_url: publicUrl };
  }

  async updateMenu(
    user: {
      userId?: string;
      establishmentId?: string;
      type: 'user' | 'establishment';
    },
    menuDto: MenuDto,
    contentLength: any,
  ): Promise<{ photo_url: string }> {
    const tenMegaBytes = 10 * 1024 * 1024;

    if (contentLength > tenMegaBytes) {
      throw new Error('File size is too big');
    }

    if (user.type === 'user') throw new Error('User cannot update menu');

    const newPhoto = new PhotosEntity();

    const establishmentEntity = await EstablishmentEntity.findOne({
      where: { id: user.establishmentId },
    });

    newPhoto.establishment = establishmentEntity;
    newPhoto.type = PhotoType.MENU;

    const { file } = menuDto;

    const fileName = `${uuidv4()}.png`;
    const folder = 'menu';
    const buf = Buffer.from(file, 'base64');

    const uploadedFile: UploadedFile = {
      fileName,
      folder,
      buffer: buf,
    };

    const publicUrl = await this.storageService.uploadFile(uploadedFile);

    newPhoto.photoUrl = publicUrl;

    try {
      const currentMenu = await PhotosEntity.findOne({
        where: {
          establishment: {
            id: user.establishmentId,
          },
          type: PhotoType.MENU,
        },
      });

      if (currentMenu) await currentMenu.remove();

      await newPhoto.save();
    } catch (error) {
      console.log(error);
      throw new Error('Error updating user profile picture');
    }

    return { photo_url: publicUrl };
  }

  async removeProfilePicture(
    user: {
      userId?: string;
      establishmentId?: string;
      type: 'user' | 'establishment';
    },
    removeProfilePictureDto: RemoveProfilePictureDto,
  ): Promise<{ success: boolean }> {
    const { order } = removeProfilePictureDto;

    const photoQuery = PhotosEntity.createQueryBuilder('photo');

    if (user.type === 'user') {
      photoQuery
        .leftJoinAndSelect('photo.user', 'user')
        .where('user.id = :userId', { userId: user.userId });
    } else if (user.type === 'establishment') {
      photoQuery
        .leftJoinAndSelect('photo.establishment', 'establishment')
        .where('establishment.id = :establishmentId', {
          establishmentId: user.establishmentId,
        });
    }

    photoQuery
      .andWhere('photo.order = :order', { order })
      .andWhere('photo.type = :type', { type: PhotoType.PROFILE });

    const photo = await photoQuery.getOne();

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    try {
      const fileName = photo.photoUrl.split('/').pop();
      await this.storageService.removeFile('profile-pictures', fileName);
      await photo.remove();
    } catch (error) {
      console.log(error);
      throw new Error('Error removing profile picture');
    }

    return { success: true };
  }
}
