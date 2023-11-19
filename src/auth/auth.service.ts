import { Injectable } from '@nestjs/common';
import {
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { EstablishmentEntity } from 'src/establishment/entities/establishment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import LoginDto from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import CheckEmailDto from './dto/check-email.dto';
import RecoverPasswordDto from './dto/recover.password.dto';
import { MailService } from 'src/mail/mail.service';
import UserRegisterDto from './dto/user-register.dto';
import EstablishmentRegisterDto from './dto/establishment-register.dto';
import { LocationService } from 'src/location/location.service';
import GeocodingDto from 'src/location/dto/geocoding.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly locationService: LocationService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<{
    id: number;
    email: string;
    type: 'user' | 'establishment';
    user?: UserEntity;
    establishment?: EstablishmentEntity;
  }> {
    const auth = await AuthEntity.findOne({
      where: { email },
      relations: ['user', 'establishment'],
    });

    if (!auth) {
      throw new NotAcceptableException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, auth.password);

    const isNotBlocked = auth.user.status !== 'blocked';

    if (isMatch && isNotBlocked) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = auth;
      return result;
    } else {
      throw new NotAcceptableException('Invalid credentials');
    }
  }

  async login(loginDto: LoginDto): Promise<{
    access_token: string;
  }> {
    const auth = (await this.validateUser(
      loginDto.email,
      loginDto.password,
    )) as AuthEntity;

    if (auth) {
      let payload = {};

      if (auth.type === 'user') {
        const user = auth.user as UserEntity;

        payload = {
          sub: user.id,
          name: user.name,
          type: auth.type,
        };
      } else if (auth.type === 'establishment') {
        const establishment = auth.establishment as EstablishmentEntity;

        payload = {
          sub: establishment.id,
          name: establishment.name,
          type: auth.type,
        };
      }

      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new NotAcceptableException('Invalid credentials');
  }

  async checkEmail(checkEmailDto: CheckEmailDto): Promise<{
    success: boolean;
  }> {
    const auth = await AuthEntity.findOne({
      where: { email: checkEmailDto.email },
    });

    return {
      success: !!auth,
    };
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<{
    success: boolean;
  }> {
    const auth = await AuthEntity.findOne({
      where: { email: recoverPasswordDto.email },
    });

    if (!auth) {
      throw new NotFoundException('Email not found');
    }

    await this.mailService.sendRecoverPasswordMail(auth);

    return {
      success: true,
    };
  }

  async refresh(req): Promise<{
    access_token: string;
  }> {
    let payload = {};

    try {
      if (req.user.type === 'user') {
        const user = await UserEntity.findOneOrFail({
          where: { id: req.user.userId },
        });

        if (user.status === 'blocked') throw new Error();

        payload = {
          sub: user.id,
          name: user.name,
          type: req.user.type,
        };
      } else if (req.user.type === 'establishment') {
        const establishment = await EstablishmentEntity.findOneOrFail({
          where: { id: req.user.establishmentId },
        });

        payload = {
          sub: establishment.id,
          name: establishment.name,
          type: req.user.type,
        };
      }
    } catch (error) {
      throw new NotAcceptableException('Session expired');
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async userRegister(userRegisterDto: UserRegisterDto): Promise<{
    access_token: string;
  }> {
    const newAuth = new AuthEntity();
    newAuth.email = userRegisterDto.email;
    newAuth.password = await bcrypt.hash(userRegisterDto.password, 10);
    newAuth.type = 'user';

    try {
      await newAuth.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }

    const newUser = new UserEntity();
    newUser.name = userRegisterDto.name;
    newUser.birthdate = userRegisterDto.birthDate;
    newUser.auth = newAuth;
    newUser.gender = userRegisterDto.gender;
    newUser.lat = userRegisterDto.lat;
    newUser.lng = userRegisterDto.lng;
    await newUser.save();

    const payload = {
      sub: newUser.id,
      name: newUser.name,
      type: newAuth.type,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async establishmentRegister(
    establishmentRegisterDto: EstablishmentRegisterDto,
  ): Promise<{
    access_token: string;
  }> {
    const newAuth = new AuthEntity();
    newAuth.email = establishmentRegisterDto.email;
    newAuth.password = await bcrypt.hash(establishmentRegisterDto.password, 10);
    newAuth.type = 'establishment';

    try {
      await newAuth.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }

    const newEstablishment = new EstablishmentEntity();
    newEstablishment.name = establishmentRegisterDto.name;
    newEstablishment.address = establishmentRegisterDto.address;
    newEstablishment.phone = establishmentRegisterDto.phone.replace(/\D/g, '');
    newEstablishment.instagram = establishmentRegisterDto.instagram;

    const geocodingDto: GeocodingDto = {
      address: establishmentRegisterDto.address,
    };

    const { lat, lng } = await this.locationService.geocoding(geocodingDto);

    newEstablishment.lat = lat;
    newEstablishment.lng = lng;

    newEstablishment.auth = newAuth;
    await newEstablishment.save();

    const payload = {
      sub: newEstablishment.id,
      name: newEstablishment.name,
      type: newAuth.type,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
