import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";


export class CreateGuideDto {

    @IsString(
        {
            message: 'title: Le titre doit être une chaîne de caractères',
        },
    )
    @IsNotEmpty(
        {
            message: 'title: Le titre est obligatoire',
        },
    )
    title: string;

    @IsString(
        {
            message: 'description: La description doit être une chaîne de caractères',
        },
    )
    @IsNotEmpty(
        {
            message: 'description: La description est obligatoire',
        },
    )
    description: string;

    @IsOptional()
    coverImage?: { url: string, cloudinaryPublicId: string };

    @IsArray()
    @IsOptional()
    images?: Array<{ url: string, cloudinaryPublicId: string }>;
    
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    user: number;

    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    address: number;

    @IsArray()
    categories: number[];
}

export class CreateDirectGuideDto extends CreateGuideDto {
    
}

export class CreateItineraryGuideDto extends CreateGuideDto {
    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    @IsString()
    startCity: string;

    @IsString()
    endCity: string;


    @IsArray()
    days: CreateDayDto[];
}

export class CreateDayDto {
    @IsString()
    date: string;

    @IsString()
    description: string;
}