import { Test, TestingModule } from '@nestjs/testing';
import { LivreurController } from './livreur.controller';
import { LivreurService } from './livreur.service';

describe('LivreurController', () => {
  let controller: LivreurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivreurController],
      providers: [LivreurService],
    }).compile();

    controller = module.get<LivreurController>(LivreurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
