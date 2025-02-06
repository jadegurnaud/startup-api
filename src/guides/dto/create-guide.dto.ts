import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsEnum, IsDate } from "class-validator";
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
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsString()
    startCity: string;

    @IsString()
    endCity: string;

    @IsArray()
    days: CreateDayDto[];
}

export class CreateContentBlockDto {
    @IsEnum(["TEXT", "IMAGE", "LINK"], { message: "contentType: Doit être une des valeurs ['TEXT', 'IMAGE', 'LINK']" })
    contentType: "TEXT" | "IMAGE" | "LINK";

    @IsString()
    content: string;
}

export class CreateSectionDto {
    @IsEnum(["ACCOMMODATION", "ACTIVITY", "FOOD", "TRANSPORT", "LIBRE"], { message: "sectionType: Doit être une des valeurs ['ACCOMMODATION', 'ACTIVITY', 'FOOD', 'TRANSPORT']" })
    sectionType: "ACCOMMODATION" | "ACTIVITY" | "FOOD" | "TRANSPORT" | "LIBRE";

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @IsOptional()
    contentBlocks?: CreateContentBlockDto[];
}

export class CreateDayDto {
    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsString()
    description: string;

    @IsArray()
    @IsOptional()
    sections?: CreateSectionDto[];
}