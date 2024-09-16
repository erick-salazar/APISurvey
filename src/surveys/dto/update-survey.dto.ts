import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyDto } from './create-survey.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {

    @IsString()
    @MinLength(10)
    surveyName: string

    @IsString()
    @MinLength(10)
    surveyDescription: string

}
