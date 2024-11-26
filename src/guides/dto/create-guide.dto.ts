import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

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
}
