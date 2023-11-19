import { Injectable, NotFoundException } from '@nestjs/common';
import UpdateProfileDto from './dto/update-profile.dto';
import { EstablishmentEntity } from './entities/establishment.entity';
import { LocationService } from 'src/location/location.service';
import GeocodingDto from 'src/location/dto/geocoding.dto';

@Injectable()
export class EstablishmentService {
  constructor(private readonly locationService: LocationService) {}

  async findOne(id: string): Promise<EstablishmentEntity> {
    const establishment = await EstablishmentEntity.findOne({
      where: {
        id,
      },
      relations: ['photos'],
    });

    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }

    return establishment;
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<{
    success: boolean;
  }> {
    const establishment = await EstablishmentEntity.findOne({
      where: {
        id,
      },
    });

    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }

    establishment.name = updateProfileDto.name;
    establishment.address = updateProfileDto.address;
    establishment.phone = updateProfileDto.phone;
    establishment.instagram = updateProfileDto.instagram;

    if (establishment.address !== updateProfileDto.address) {
      const geocodingDto: GeocodingDto = {
        address: updateProfileDto.address,
      };

      const location = await this.locationService.geocoding(geocodingDto);

      const { lat, lng } = location;

      establishment.lat = lat;
      establishment.lng = lng;
    }

    await establishment.save();

    return {
      success: true,
    };
  }

  async delete(id: string): Promise<{
    success: boolean;
  }> {
    const establishment = await EstablishmentEntity.findOneOrFail({
      where: {
        id,
      },
      relations: ['photos', 'auth'],
    });

    establishment.photos.map(async (photo) => {
      await photo.remove();
    });

    await establishment.auth.remove();

    await establishment.remove();

    return {
      success: true,
    };
  }
}
