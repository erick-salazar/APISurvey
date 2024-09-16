import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsBoolean, IsString, MinLength } from 'class-validator';

export class UpdateRoleDto //extends PartialType(CreateRolDto) {
{
    @IsString()
    @MinLength(3)
    rolName:string;

    @IsBoolean()
    status?:boolean;

    @IsString()
    updatedBy:string;

}
