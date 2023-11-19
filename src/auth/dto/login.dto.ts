import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
