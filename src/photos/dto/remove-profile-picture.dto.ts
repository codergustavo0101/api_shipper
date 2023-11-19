import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class RemoveProfilePictureDto {
  @ApiProperty({
    description: 'The profile picture order',
    required: true,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumberString()
  order: number;
}
