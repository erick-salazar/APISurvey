import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/roles.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { QuestionsModule } from './questions/questions.module';
import { SurveysModule } from './surveys/surveys.module';;
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        encrypt: false, // MSSQL-specific option
      },
      synchronize: true, //use this with development enviroment
      autoLoadEntities:true,
      entities: [],
    }),
    
    UsersModule, RoleModule, CommonModule, SeedModule, QuestionsModule, SurveysModule, AuthModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
