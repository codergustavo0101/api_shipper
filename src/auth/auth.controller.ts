import { Body, Controller, Post, Req } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import EstablishmentRegisterDto from './dto/establishment-register.dto';
import LoginDto from './dto/login.dto';
import RecoverPasswordDto from './dto/recover.password.dto';
import UserRegisterDto from './dto/user-register.dto';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{
    access_token: string;
  }> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('recover-password')
  async recoverPassword(
    @Body() recoverPasswordDto: RecoverPasswordDto,
  ): Promise<{
    success: boolean;
  }> {
    return this.authService.recoverPassword(recoverPasswordDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Post('refresh')
  async refresh(@Req() req): Promise<{
    access_token: string;
  }> {
    return this.authService.refresh(req);
  }

  @Public()
  @Post('/user/register')
  async userRegister(@Body() userRegisterDto: UserRegisterDto): Promise<{
    access_token: string;
  }> {
    return this.authService.userRegister(userRegisterDto);
  }

  @Public()
  @Post('/establishment/register')
  async establishmentRegister(
    @Body() establishmentRegisterDto: EstablishmentRegisterDto,
  ): Promise<{
    access_token: string;
  }> {
    return this.authService.establishmentRegister(establishmentRegisterDto);
  }
}
