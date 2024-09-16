import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{

    @ApiProperty({
        default:10,
        description: 'total of rows by request',
        required:false
    })
    @IsOptional()
    @IsPositive()
    @Type(()=>Number)
    limit?:number;

    @ApiProperty({
        default:0,
        description: 'total of rows skipped',
        required:false
    })
    @IsOptional()
    @Type(()=>Number)
    @Min(0)
    offset?:number;

}