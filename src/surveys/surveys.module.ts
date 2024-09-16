import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SurveysController],
  providers: [SurveysService],
  imports: [
    TypeOrmModule.forFeature([Survey]),
    AuthModule
  ],
})
export class SurveysModule {}
