import { BadRequestException, HttpCode, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException, Query } from '@nestjs/common';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    private readonly logger = new Logger('UsersService');

    constructor(
        @InjectRepository(User) private readonly userRespository: Repository<User>,
    ) { }

    findAll(@Query() paginationDto: PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.userRespository.find({
            take: limit,
            skip: offset
        });
    }

    async findOne(userId: string) {

        const user = await this.userRespository.findOneBy({ userId },
            
        );
        if (!user) throw new BadRequestException('No records founds')

        return user;
    }

    async create(createUserDto: CreateUserDto) {
        try {

            const {password,...userData} = createUserDto;

            const user = this.userRespository.create({
                ...userData,
                password: bcrypt.hashSync(password,10)
            });
            await this.userRespository.save(user);
            delete user.password;
            return user;

        } catch (error) {
            this.handledExpections(error);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {

        try {
            const user = await this.userRespository.preload({
                userId: id,
                ...updateUserDto
            });

            if (!user) throw new BadRequestException('No records founds for update');

            await this.userRespository.save(user);

            return user;
        } catch (error) {
            this.handledExpections(error);
        }
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        await this.userRespository.remove(user);
    }

    async removeAll() {
        try {
    
          const query = this.userRespository.createQueryBuilder('user');
          
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
