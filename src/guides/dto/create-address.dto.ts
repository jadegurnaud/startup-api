import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsString(
        {
            message: 'country: Le pays doit être une chaîne de caractères',
        },
    )
    @IsNotEmpty(
        {
            message: 'country: Le pays est obligatoire',
        },
    )
    country: string;

    @IsString(
        {
            message: 'city: La ville doit être une chaîne de caractères',
        },
    )
    @IsNotEmpty(
        {
            message: 'city: La ville est obligatoire',
        },
    )
    city: string;

}