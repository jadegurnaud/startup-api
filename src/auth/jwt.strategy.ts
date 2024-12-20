
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';  // Importation de ConfigService


export type UserPayload = { userId: number };
export type RequestWithUser = { user: UserPayload };
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'), // Utilisation de la clé secrète
    });
  }

  async validate({ userId }: UserPayload) {
    if (!userId) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { userId };
  }
}
