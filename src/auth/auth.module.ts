import { Module, Injectable, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import {PassportModule} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStategy],
  imports:[
    forwardRef(() => UsersModule),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[],
      inject:[],
      useFactory:()=>{
        return {
          secret: process.env.JWT_SECRECT,
          signOptions:{
            expiresIn:'1h'
          }
        }
      }
    })
  ],
  exports:[JwtStategy,PassportModule,JwtModule]
})
export class AuthModule {}
