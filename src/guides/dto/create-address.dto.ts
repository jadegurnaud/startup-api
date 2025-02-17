import { Transform, Type } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

    @IsString(
        {
            message: 'address: L\'adresse doit être une chaîne de caractères',
        },
    )
    @IsOptional()
    address: string;

    @IsNotEmpty(
        {
            message: 'longitude: La longitude est obligatoire',
        },
    )
    @Transform(({ value }) => parseFloat(value))
    @IsDecimal()
    longitude: number;

 
    @IsNotEmpty(
        {
            message: 'latitude: La latitude est obligatoire',
        },
    )
    @Transform(({ value }) => parseFloat(value))
    @IsDecimal()
    latitude: number;



}