import { ApiProperty } from "@nestjs/swagger";
import { IsString, Min, min } from "class-validator";

export class LoginUserResponsetDto{

    @ApiProperty({
        description: 'user id',
        example:'admin'
    })
    @Min(6)
    @IsString()
    readonly userId:string;

    @ApiProperty({
        description: 'user role',
        example:'admin'
    })
    @Min(6)
    @IsString()
    readonly role:string;

    @ApiProperty({
        description: 'user name',
        example:'Juan Perez'
    })
    @Min(6)
    @IsString()
    readonly userName:string;

    @ApiProperty({
        description: 'user password',
        example:'eeeesdsdsdsd.sdsdsdsd.sdsqweqwewewe'
    })
    @Min(6)
    @IsString()
    readonly token:string;

    
}