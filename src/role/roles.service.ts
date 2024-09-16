import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Query } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { QueryResult, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class RoleService {

  private readonly logger = new Logger('RoleService');

  constructor(
    @InjectRepository(Role) private readonly roleRespository: Repository<Role>,
  ) { }

  async create(createRolDto: CreateRoleDto) {
    try {

      const rol = this.roleRespository.create(createRolDto);
      await this.roleRespository.save(rol);

      return rol;

    } catch (error) {
      this.handledExpections(error);
    }
  }

  findAll(@Query() paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.roleRespository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(roleId: number) {
    let role = await this.roleRespository.findOneBy({ roleId });
    if (!role) throw new BadRequestException('No records founds');

    return role;
  }

  async update(id: number, updateRolDto: UpdateRoleDto) {
    try {
      const role = await this.roleRespository.preload({
        roleId: id,
        ...updateRolDto
      });

      if (!role) throw new BadRequestException('No records founds for update');

      await this.roleRespository.save(role);

      return role;
    } catch (error) {
      this.handledExpections(error);
    }
  }

  async remove(id: number) {
    const rol = await this.findOne(id);
    await this.roleRespository.remove(rol);
  }

  async removeAll() {
    try {

      const query = this.roleRespository.createQueryBuilder('rol');
      
      return await query
      .delete()
      .where({})
      .execute();

    } catch (error) {
      this.handledExpections(error);
    }
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
