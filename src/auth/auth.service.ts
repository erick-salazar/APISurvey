import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { LoginUserResponsetDto } from './dtos/login-user-response.dto';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        private readonly datasource: DataSource,
        private readonly jwtService: JwtService
    ) { }

    async login(loginUserDto: LoginUserRequestDto) {

        const { userId, password } = loginUserDto;

        const user = await this.datasource.manager.findOneBy(User, { userId });

        if (!user) { throw new UnauthorizedException('wrong user or password'); }

        if (!bcrypt.compareSync(password, user.password)) { throw new UnauthorizedException('wrong user or password'); }

        const loginUserResponsetDto : LoginUserResponsetDto = {
            userId,
            userName:  user.firstName + ' ' + user.lastName,
            role: user.roles.rolName,
            token: this.generatJwt({ userId: user.userId })
        };

        return loginUserResponsetDto;

    }

    refreshToken(user: User) {

        const { userId } = user;

        if (!user) { throw new UnauthorizedException('wrong user or password'); }

        return {
            userId,
            userName: user.firstName + ' ' + user.lastName,
            role: user.roles.rolName,
            token: this.generatJwt({ userId: user.userId })
        };

    }

    private generatJwt(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }

    private handledExpections(error: any) {
        switch (error) {
            case '23505': {
                throw new BadRequestException(error.details);
            }
            default: {
                this.logger.error(error);
                throw new InternalServerErrorException('Unexpected error, check logs sever');
            }
        }
    }
}
