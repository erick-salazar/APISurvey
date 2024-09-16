import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Surveys')
@Controller('Surveys')
@Auth(ValidRoles.admin)
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(
    @Body() createSurveyDto: CreateSurveyDto,
    @GetUser() user: User
  ) {
    return this.surveysService.create(createSurveyDto,user);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
    @GetUser() user: User
  ) {
    return this.surveysService.findAll(paginationDto,user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: User
  ) {
    return this.surveysService.findOne(+id,user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto,
    @GetUser() user: User
  ) {
    return this.surveysService.update(+id, updateSurveyDto,user);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: User
  ) {
    return this.surveysService.remove(+id,user);
  }
}
