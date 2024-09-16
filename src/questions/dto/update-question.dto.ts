import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { UpdateAnwerDto } from './update-anwer.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {

    @IsString()
    @MinLength(3)
    questionName:string;

    @IsBoolean()
    status?:boolean;

    @IsString()
    updatedBy:string;

    @IsOptional()
    @IsArray()
    anwers?: UpdateAnwerDto[]

}
