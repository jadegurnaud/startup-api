import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LogUserDto } from '../users/dto/log-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async login({ authBody }: { authBody: LogUserDto }) {
        const { email, password } = authBody;
        
        const existingUser = await this.usersRepository.findOne({
            where: 
            { 
                email,
            }
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.isPasswordValid({ password, hashedPassword: existingUser.password });
        if (!isPasswordValid) {
            throw new Error('Password is incorrect');
        }
        return this.authenticateUser({ userId: existingUser.id });
        
    }

    async register({ registerBody }: { registerBody: CreateUserDto }) {
        const { email, password, lastName, firstName } = registerBody;
        
        const existingUser = await this.usersRepository.findOne({
            where: 
            { 
                email,
            }
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

    private async hashPassword({ password }: { password: string}) {
        const hashPassword = await hash(password, 10);
        return hashPassword;
    }

    private async isPasswordValid({ password, hashedPassword }: { password: string; hashedPassword: string }) {
        const isPasswordValid = await compare(password, hashedPassword);
        return isPasswordValid;
    }

    private async authenticateUser({ userId }: UserPayload) {
        const payload: UserPayload = { userId };
        return{
            access_token: this.jwtService.sign(payload),
        }
    }
}
