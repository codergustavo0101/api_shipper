import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsNumber } from 'class-validator';

export default class ProfilePictureDto {
  @ApiProperty({
    description: 'The profile picture',
    required: true,
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsBase64()
  file: any;

  @ApiProperty({
    description: 'The profile picture order',
    required: true,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  order: number;
}
