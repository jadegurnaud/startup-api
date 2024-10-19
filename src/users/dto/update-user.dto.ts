import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
}
