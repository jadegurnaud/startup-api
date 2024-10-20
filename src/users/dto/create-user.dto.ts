import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail(
        {},
        {
            message: 'Invalid email',
        },
    )
    email: string;

    @IsNotEmpty()
    @MinLength(2, {
        message: 'Password must be at least 8 characters long',
    })
    password: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    isActive: boolean;
}
