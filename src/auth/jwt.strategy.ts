import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<
    | {
        userId: any;
        type: any;
        establishmentId?: undefined;
      }
    | {
        establishmentId: any;
        type: any;
        userId?: undefined;
      }
  > {
    const type = payload.type;

    return type === 'user'
      ? {
          userId: payload.sub,
          type: payload.type,
        }
      : {
          establishmentId: payload.sub,
          type: payload.type,
        };
  }
}
