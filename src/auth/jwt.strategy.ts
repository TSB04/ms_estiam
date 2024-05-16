import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "VOUS_NE_PASSEREZ_JAMAIS_DANS_CETTE_VIE_."
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
