import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RoleService } from '../role/roles.service';
import { initialData } from './data/seed-data';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class SeedService {

  constructor(
    private readonly usersService: UsersService,
    private readonly roleService: RoleService
  ){}

  async runSeed(){
    this.insertUserRol();

    return "seed executed";
  }

  private async insertUserRol(){
    await this.usersService.removeAll();
    await this.roleService.removeAll(); 

    const rolUser = initialData;

    await this.roleService.create(initialData.Rol);
    
    const paginationDto: PaginationDto = {limit:1};
    const roleId = await this.roleService.findAll(paginationDto);

    initialData.User.roleId=roleId[0].roleId;

    await this.usersService.create(initialData.User);

  }

}
