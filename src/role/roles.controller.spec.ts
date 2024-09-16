import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RoleService } from './roles.service';

describe('RolsController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RoleService],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
