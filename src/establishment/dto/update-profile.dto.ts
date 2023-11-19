import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class UpdateProfileDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-200',
    description: 'Establishment address',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    example: '21 99999-9999',
    description: 'Establishment phone',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'establishment',
    description: 'Establishment Instagram',
  })
  @IsOptional()
  @IsString()
  instagram: string;
}
