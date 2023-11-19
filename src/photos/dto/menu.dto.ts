import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty } from 'class-validator';

export default class MenuDto {
  @ApiProperty({
    description: 'The profile picture',
    required: true,
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsBase64()
  file: any;
}
