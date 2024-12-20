import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LogUserDto } from '../users/dto/log-user.dto';
import { Request as ExpressRequest, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('refresh')
  async refresh(@Req() req: ExpressRequest, @Res() res: Response) {
    const cookies = req.cookies;

    if (!cookies || !cookies['refresh_token']) {
      throw new Error('No refresh token found');
    }

    const refreshToken = cookies['refresh_token'];
    let newAccessToken: string;
    try {
      newAccessToken = await this.authService.refreshAccessToken(refreshToken);
    } catch (error) {
      // DO NOT CHANGE THE TEXT OF THIS ERROR MESSAGE OTHERWISE A CHANGES IN THE FRONTEND WILL BE NEEDED
      return res
        .status(401)
        .send({ error: 'Invalid or expired refresh token' });
    }

    return { accessToken: newAccessToken, refreshToken };
  }
  @Post('login')
  async login(@Body() authBody: LogUserDto, @Res() res: Response) {
    try {
      const tokens = await this.authService.login({ authBody });
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: false, // Secure en prod
        sameSite: 'strict', // Protéger contre CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      });
      res.send({ access_token: tokens.access_token });
    } catch (error) {
      res.status(401);
      res.send({ message: [error.message] });
    }
  }

  @Post('register')
  async register(@Body() registerBody: CreateUserDto) {
    return await this.authService.register({ registerBody });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateUser(@Request() request: RequestWithUser) {
    const user = await this.usersService.findOne(request.user.userId);
    return user;
  }
}
