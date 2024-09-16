import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UsersService } from "src/users/users.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {

    constructor(
        
        private readonly usersService: UsersService,
    ){
        super({
            secretOrKey: process.env.JWT_SECRECT,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),

        });
    }

    async validate(payload: JwtPayload): Promise<User>{

        const {userId} = payload;

        const user = await this.usersService.findOne(userId);

        if(!user) {throw new UnauthorizedException('Token not valid')}

        if(!user.status) {throw new UnauthorizedException('Token not valid')}

        return user;
    }

}
