import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export default class LikeUserDto {
  @ApiProperty({
    description: 'The user id',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
