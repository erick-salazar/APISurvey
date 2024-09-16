import { IsArray, IsInt, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator";
import { Anwer } from "../entities/anwers.entity";
import { CreateAnwerDto } from "./create-anwer.dto";

export class CreateQuestionDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    surveyId:number;

    @IsString()
    @MinLength(3)
    questionName:string;

    @IsString()
    createBy:string;

    @IsOptional()
    @IsArray()
    anweres?: CreateAnwerDto[]
}
