import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SexPreferenceEnum } from '../entities/preferences.entity';

export default class UpdatePreferencesDto {
  @ApiProperty({
    description: 'User city',
    example: 'Paris',
    maxLength: 255,
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  city: string;

  @ApiProperty({
    description: 'User latitude',
    example: 48.856614,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({
    description: 'User longitude',
    example: 2.3522219,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  lng: number;

  @ApiProperty({
    description: 'User min age preference',
    example: 18,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  minAgePreference: number;

  @ApiProperty({
    description: 'User max age preference',
    example: 99,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  maxAgePreference: number;

  @ApiProperty({
    description: 'User max distance',
    example: 100,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  maxDistance: number;

  @ApiProperty({
    description: 'User sex preference',
    example: 'BOTH',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIn(['M', 'F', 'BOTH'])
  sexPreference: SexPreferenceEnum;
}
