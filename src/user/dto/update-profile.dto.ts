import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export default class UpdateProfileDto {
  @ApiProperty({
    description: 'User description',
    example: "I'm a nice guy",
    maxLength: 200,
  })
  @IsOptional()
  @MaxLength(200)
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Incognito mode',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  incognito: boolean;
}
