import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";

export class LogUserDto {
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
}
