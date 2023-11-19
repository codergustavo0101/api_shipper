import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class GeocodingDto {
  @ApiProperty({
    example: 'Av. Paulista, 1000, São Paulo - SP, 01310-200, Brazil',
    description: 'User address',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
