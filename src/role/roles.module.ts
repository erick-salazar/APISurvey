import { Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Role]),
    AuthModule
  ],
  exports:[RoleService, TypeOrmModule]
})
export class RoleModule {}
