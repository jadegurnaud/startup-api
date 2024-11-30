import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({
        message: 'email: L\'email est obligatoire',
    })
    @IsEmail({}, {
        message: 'email: L\'email doit être une adresse email valide',
    })
    email: string;

    @IsNotEmpty({
        message: 'password: Le mot de passe est obligatoire',
    })
    @MinLength(2, {
        message: 'password: Le mot de passe doit contenir au moins 2 caractères',
    })
    password: string;
    @IsNotEmpty({
        message: 'firstName: Le prénom est obligatoire',
    })
    @IsString()
    firstName: string;
    @IsNotEmpty({
        message: 'lastName: Le nom est obligatoire',
    })
    @IsString()
    lastName: string;
    @IsNotEmpty({
        message: 'pseudo: Le pseudo est obligatoire',
    })
    @IsString()
    pseudo: string;
    @IsNotEmpty({
        message: 'dateOfBirth: La date de naissance est obligatoire',
    })
    dateOfBirth: Date;
    isActive: boolean;
}
