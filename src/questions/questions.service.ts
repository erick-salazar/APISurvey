import { BadRequestException, Injectable, InternalServerErrorException, Logger, Query } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Anwer } from './entities/anwers.entity';
import { Question } from './entities/question.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class QuestionsService {
  private readonly logger = new Logger('QuestionsService');

  constructor(
    @InjectRepository(Question) private readonly questionRespository: Repository<Question>,
    @InjectRepository(Anwer) private readonly anwerRespository: Repository<Anwer>,
    private readonly datasource: DataSource
  ) { }

  async create(createQuestionDto: CreateQuestionDto) {
    try {

      const { anweres = [], ...questionDetails } = createQuestionDto;

      const entity = this.questionRespository.create({
        ...questionDetails,
        questionAnwer: anweres.map(x => this.anwerRespository.create({
          createBy: questionDetails.createBy,
          ...x
        }))
      });
      await this.questionRespository.save(entity);

      return entity;

    } catch (error) {
      this.handledExpections(error);
    }
  }


  findAll(@Query() paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.questionRespository.find({
      take: limit,
      skip: offset,
      relations: {
        questionAnwer: true
      }
    });
  }

  async findOne(surveyId: number) {
    let entity = await this.questionRespository.findOneBy({ surveyId });
    if (!entity) throw new BadRequestException('No records founds');

    return entity;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {

    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const { anweres, ...toUpdate } = updateQuestionDto;

      const question = await queryRunner.manager.preload(Question, {
        questionId: id,
        ...toUpdate
      });

      if (!question) throw new BadRequestException('No records founds for update');

      anweres.forEach(async anwer => {

        const anwerDB = await queryRunner.manager.preload(Anwer, anwer);

        if (anwerDB) {
          queryRunner.manager.save(Anwer, {
            updatedBy: toUpdate.updatedBy,
            ...anwerDB
          });
        }

        queryRunner.manager.create(Anwer, {
          createBy: toUpdate.updatedBy,
          ...anwer
        });

      });

      const anwersDB = await queryRunner.manager.findBy(Anwer, {
        questionId: id
      });

      anwersDB.forEach(async anwer => {

        const anweresCreated = anweres.find(item => item.anwerId == anwer.anweresId);

        if (!anweresCreated) {
          const anwerDelete = await queryRunner.manager.findBy(Anwer, {
            anweresId: anwer.anweresId
          });
          await queryRunner.manager.remove(queryRunner);
        }
      });
      queryRunner.manager.save(Question, question);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { question };

    } catch (error) {
      queryRunner.rollbackTransaction();
      queryRunner.release();
      this.handledExpections(error);
    }
  }

  async remove(id: number) {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const anwerDelete = await queryRunner.manager.findBy(Anwer, {
        questionId: id
      });
      await queryRunner.manager.remove(anwerDelete);

      const questionDelete = await queryRunner.manager.findBy(Question, {
        questionId: id
      });
      await queryRunner.manager.remove(questionDelete);

      await queryRunner.commitTransaction();
      await queryRunner.release();

    } catch (error) {
      queryRunner.rollbackTransaction();
      queryRunner.release();
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
