import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthEntity } from './entities/auth.entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    LocationModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
