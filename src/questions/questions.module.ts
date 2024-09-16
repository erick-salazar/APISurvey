import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Anwer } from './entities/anwers.entity';
import { AnwerTypes } from './entities/anwer-types.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    TypeOrmModule.forFeature([Question, Anwer, AnwerTypes]),
    AuthModule
  ],
})
export class QuestionsModule {}
