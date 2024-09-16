import { IsString, MinLength } from "class-validator";

export class CreateSurveyDto {

    @IsString()
    @MinLength(10)
    surveyName: string

    @IsString()
    @MinLength(10)
    surveyDescription: string

}
