import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dtos/login-user-request.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserResponsetDto } from './dtos/login-user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({status:200, description: 'Login infomation with JWT', type:LoginUserResponsetDto })
  @ApiResponse({status:400, description: 'Wrong parameter sent' })
  @ApiResponse({status:401, description: 'Unauthorized wrong user or password' })
  @ApiResponse({status:500, description: 'Server API Error' })
  login(@Body() loginUserDto : LoginUserRequestDto){
    return this.authService.login(loginUserDto);
  }

  @Get('refreshtoken')
  @ApiResponse({status:200, description: 'Login infomation with JWT', type:LoginUserResponsetDto })
  @ApiResponse({status:400, description: 'Wrong parameter sent' })
  @ApiResponse({status:401, description: 'Unauthorized wrong user or password' })
  @ApiResponse({status:500, description: 'Server API Error' })
  @ApiBearerAuth()
  @Auth()
  refreshtoken(
    @GetUser() user: User
  ){
    return this.authService.refreshToken(user);
  }

}
