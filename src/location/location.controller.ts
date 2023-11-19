import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import GeocodingDto from './dto/geocoding.dto';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiBearerAuth()
  @Get('/reverse-geocoding/:lat/:lng')
  async reverseGeocoding(@Param('lat') lat: number, @Param('lng') lng: number) {
    return this.locationService.reverseGeocoding(lat, lng);
  }

  @ApiBearerAuth()
  @Post('/geocoding')
  async geocoding(@Body() geocodingDto: GeocodingDto) {
    return this.locationService.geocoding(geocodingDto);
  }
}
