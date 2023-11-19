import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CheckEmailDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
