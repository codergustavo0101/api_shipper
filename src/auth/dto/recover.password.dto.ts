import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class RecoverPasswordDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
