import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";

export class LogUserDto {
    @IsEmail(
        {},
        {
            message: 'email: L\'email doit être une adresse email valide',
        },
    )
    @IsNotEmpty(
        {
            message: 'email: L\'email est obligatoire',
        },
    )
    email: string;

    @IsNotEmpty(
        {
            message: 'password: Le mot de passe est obligatoire',
        },
    )
    @MinLength(2, {
        message: 'password: Le mot de passe doit contenir au moins 2 caractères',
    })
    password: string;
}
