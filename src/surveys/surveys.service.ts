import { BadRequestException, Injectable, InternalServerErrorException, Logger, Query } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SurveysService {
  private readonly logger = new Logger('SurveysService');

  constructor(
    @InjectRepository(Survey) private readonly respository: Repository<Survey>,
  ) { }
  
  async create(
    createSurveyDto: CreateSurveyDto,
    user: User
  ) {
    try {

      const entity = this.respository.create({
        ...createSurveyDto,
        createBy:user.userId
      });
      await this.respository.save(entity);

      return entity;

    } catch (error) {
      this.handledExpections(error);
    }
  }

  
  async findAll(
    @Query() paginationDto: PaginationDto,
    user: User
  ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return await this.respository.find({
      where:{
        createBy:user.userId
      },
      take:limit,
      skip:offset
    });

  }

  async findOne(surveyId: number, user: User)  {
    let entity = await this.respository.find({
      where:{
        surveyId,
        createBy:user.userId
      }
    });

    if (!entity) throw new BadRequestException('No records founds');

    return entity;
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto, user: User) {
    try {

      const entityFind = this.findOne(id,user);

      const entity = await this.respository.preload({
        surveyId: id,
        ...updateSurveyDto,
        updatedBy:user.userId
      });

      if (!entity) throw new BadRequestException('No records founds for update');

      await this.respository.save(entity);

      return entity;
    } catch (error) {
      this.handledExpections(error);
    }
  }

  async remove(id: number, user: User) {
    const entity = await   this.findOne(id,user);

    await this.respository.remove(entity);
  }

  async removeAll() {
    try {

      const query = this.respository.createQueryBuilder('survey');
      
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
