import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsEnum, IsDate, IsBoolean } from "class-validator";
import { Transform, Type } from "class-transformer";
import { CreateAddressDto } from "./create-address.dto";
import { GuideStatus, GuideType } from "../types/guide.types";


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

    @IsEnum(["published", "draft"], { message: "status: Doit être une des valeurs ['PUBLISHED', 'DRAFT']" })
    status: GuideStatus.DRAFT | GuideStatus.PUBLISHED; 

    @IsEnum(["direct", "itinerary"], { message: "guideType: Doit être une des valeurs ['DIRECT', 'ITINERARY']" })
    guideType: GuideType.DIRECT | GuideType.ITINERARY;

    @IsBoolean()
    isTravel: boolean;

    @IsNotEmpty()
    views: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    price: number;
    
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    user: number;

    @Type(() => CreateAddressDto)
    @IsNotEmpty()
    address: CreateAddressDto;

    @IsArray()
    categories: number[];
}

export class CreateDirectGuideDto extends CreateGuideDto {
    
}

export class CreateItineraryGuideDto extends CreateGuideDto {
    
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @IsString()
    startCity: string;

    @IsString()
    endCity: string;
    
    @Type(() => CreateDayDto)
    @IsArray()
    @IsOptional()
    days: CreateDayDto[];
    
    @Type(() => CreateStayDto)
    @IsArray()
    @IsOptional()
    stays: CreateStayDto[];
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

    @Type(() => CreateContentBlockDto)
    @IsArray()
    @IsOptional()
    contentBlocks?: CreateContentBlockDto[];
}

export class CreateDayDto {
    
    @Type(() => Date)
    @IsDate()
    date: Date;

    @IsString()
    description: string;

    @Type(() => CreateSectionDto)
    @IsArray()
    @IsOptional()
    sections?: CreateSectionDto[];
}

export class CreateStayDto {
    
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @IsString()
    description: string;

    @Type(() => CreateAddressDto)
    @IsNotEmpty()
    address: CreateAddressDto;

    
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    order: number;

    @Type(() => CreateDayDto)
    @IsArray()
    @IsOptional()
    days?: CreateDayDto[];

    @Type(() => CreateInterStayTransportDto)
    @IsArray()
    @IsOptional()
    departingTransports?: CreateInterStayTransportDto[];

    @Type(() => CreateInterStayTransportDto)
    @IsArray()
    @IsOptional()
    arrivingTransports?: CreateInterStayTransportDto[];
}

export class CreateInterStayTransportDto {
    @IsInt()
    fromStay: number;

    @IsInt()
    toStay: number;

    @IsString()
    description: string;

    @IsEnum(["TRAIN", "BUS", "AVION", "VELO"], { message: "transportType: Doit être une des valeurs ['TRAIN', 'BUS', 'AVION', 'VELO']" })
    transportType: "TRAIN" | "BUS" | "AVION" | "VELO";

    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    order: number;
}