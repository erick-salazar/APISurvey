import { IsBoolean, IsDate, IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class UpdateUserDto{

    @IsString()
    readonly userId?:string;
    @IsString()
    @IsOptional()
    readonly firstName?: string;
    @IsString()
    @IsOptional()
    readonly secondName?:string;
    @IsString()
    @IsOptional()
    readonly lastName?: string;
    @IsString()
    @IsOptional()
    readonly secondLastName?: string;
    @IsString()
    @IsOptional()
    readonly password?:string;
    @IsBoolean()
    @IsOptional()
    readonly status?:boolean;
    
    @IsInt()
    @IsPositive()
    @Min(1)
    roleId:number;
}