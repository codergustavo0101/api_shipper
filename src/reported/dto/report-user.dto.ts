import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export default class ReportUserDto {
  @ApiProperty({
    example: 'f4a4a4a4-4a4a-4a4a-4a4a-4a4a4a4a4a4a',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
