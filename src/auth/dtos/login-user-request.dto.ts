import { ApiProperty } from "@nestjs/swagger";
import { IsString, Min, MinLength } from "class-validator";

export class LoginUserRequestDto{

    @ApiProperty({
        description: 'user id',
        example:'admin'
    })
    @IsString()
    @MinLength(6)
    readonly userId:string;

    @ApiProperty({
        description: 'user password',
        example:'s3cr3password'
    })
    @IsString()
    @MinLength(6)
    readonly password:string;

}