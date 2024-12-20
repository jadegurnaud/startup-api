import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LogUserDto } from '../users/dto/log-user.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Inject ConfigService
    private readonly usersService: UsersService,
  ) {}

  private get accessTokenSecret(): string {
    return this.configService.get<string>('ACCESS_TOKEN_SECRET');
  }

  private get refreshTokenSecret(): string {
    return this.configService.get<string>('REFRESH_TOKEN_SECRET');
  }

  async createAccessToken(userId: number): Promise<string> {
    return jwt.sign({ userId }, this.accessTokenSecret, { expiresIn: '15m' });
  }

  async createRefreshToken(userId: number): Promise<string> {
    const refreshToken = jwt.sign({ userId }, this.refreshTokenSecret, {
      expiresIn: '7d',
    });

    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, { refreshToken: hashedToken });

    return refreshToken;
  }

  async compareTokens(token: string, user: User): Promise<boolean> {
    return bcrypt.compare(token, user.refreshToken);
  }

  async validateRefreshToken(userId: number, token: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = await this.compareTokens(token, user);

    return isValid;
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret) as {
        userId: number;
      };
      const isValid = await this.validateRefreshToken(
        decoded.userId,
        refreshToken,
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return this.createAccessToken(decoded.userId);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async login({ authBody }: { authBody: LogUserDto }) {
    const { email, password } = authBody;

    const existingUser = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.isPasswordValid({
      password,
      hashedPassword: existingUser.password,
    });
    if (!isPasswordValid) {
      throw new Error('password: Mot de passe incorrect');
    }
    return this.authenticateUser({ userId: existingUser.id });
  }

  async register({ registerBody }: { registerBody: CreateUserDto }) {
    const { email, password, lastName, firstName } = registerBody;

    const existingUser = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('User exists already');
    }

    const hashedPassword = await this.hashPassword({ password });

    const createdUser = new User(registerBody);
    createdUser.password = hashedPassword;
    createdUser.isActive = true;
    await this.usersRepository.save(createdUser);

    return { message: 'User created successfully' };
  }

  private async hashPassword({ password }: { password: string }) {
    const hashPassword = await hash(password, 10);
    return hashPassword;
  }

  private async isPasswordValid({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    const isPasswordValid = await compare(password, hashedPassword);
    return isPasswordValid;
  }

  private async authenticateUser({ userId }: UserPayload) {
    const payload: UserPayload = { userId };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.createRefreshToken(userId);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
