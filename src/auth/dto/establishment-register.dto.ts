import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class EstablishmentRegisterDto {
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
    example: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-200',
    description: 'Establishment address',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: '21 99999-9999',
    description: 'Establishment phone',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'establishment',
    description: 'Establishment Instagram',
  })
  @IsNotEmpty()
  @IsString()
  instagram: string;
}
