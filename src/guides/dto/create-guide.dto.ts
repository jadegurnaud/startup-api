import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class CreateGuideDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    coverImage?: string;

    @IsArray()
    @IsOptional()
    images?: string[];
    
    @IsInt()
    user: number;
}
