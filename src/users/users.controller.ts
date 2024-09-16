import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@Auth(ValidRoles.admin)
export class UsersController {

    constructor(private readonly userServices: UsersService){

    }

    @Get()
    getAllUsers(@Query() paginationDto: PaginationDto){
        return this.userServices.findAll(paginationDto);
    }

    @Get(':id')    
    getUserById(@Param('id', /*ParseIntPipe*/) id:string){
        const users = this.userServices.findOne(id);

        if(!users) throw new NotFoundException(`User not found`);
        
        return users;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        return await this.userServices.create(createUserDto);
    }

    @Patch(':id')
    async update(
        @Param('id') id:string,
        @Body() updateUser: UpdateUserDto
    ){
        return await this.userServices.update(id,updateUser);
    }

    @Delete(':id')
    async remove(@Param('id') id:string){
        return await this.userServices.remove(id);
    }
}
