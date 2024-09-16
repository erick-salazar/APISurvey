import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class UpdateAnwerDto {
    @IsInt()
    @IsPositive()
    @Min(1)
    anwerId:number;

    @IsInt()
    @IsPositive()
    @Min(1)
    anweresTypeId:number;

    @IsString()
    @MinLength(3)
    anweresName: string

    @IsString()
    updatedBy?:string;
}