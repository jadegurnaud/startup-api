import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LogUserDto } from 'src/users/dto/log-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('login')
    async login(@Body() authBody: LogUserDto ) {
        console.log(authBody);
        return await this.authService.login({ authBody });
    }

    @Post('register')
    async register(@Body() registerBody: CreateUserDto ) {
        return await this.authService.register({ registerBody });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async authenticateUser(@Request() request: RequestWithUser) {
        return await this.usersService.findOne(request.user.userId);
    }
}
