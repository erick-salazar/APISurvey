import { IsBoolean, IsDate, IsString, IsOptional, IsInt, IsPositive, Min } from 'class-validator';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto{

    @IsString()
    readonly userId:string;
    @IsString()
    readonly firstName: string;
    @IsString()
    @IsOptional()
    readonly secondName?:string;
    @IsString()
    readonly lastName: string;
    @IsString()
    @IsOptional()
    readonly secondLastName?: string;
    @IsString()
    readonly password:string;

    @IsInt()
    @IsPositive()
    @Min(1)
    roleId:number;
}