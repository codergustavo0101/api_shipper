import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class UserRegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  password: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'User birth date',
  })
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  birthDate: Date;

  @ApiProperty({
    example: 'M',
    description: 'User gender',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['M', 'F'])
  gender: 'M' | 'F';

  @ApiProperty({
    example: -23.533773,
    description: 'User latitude',
  })
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({
    example: -46.62529,
    description: 'User longitude',
  })
  @IsNotEmpty()
  @IsNumber()
  lng: number;
}
