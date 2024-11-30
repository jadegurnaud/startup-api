import { IsInt } from "class-validator";

export class CreateFavoriteDto {

    @IsInt()
    user: number;

    @IsInt()
    guide: number;
}
