import { Test, TestingModule } from '@nestjs/testing';
import { LivreurService } from './livreur.service';

describe('LivreurService', () => {
  let service: LivreurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivreurService],
    }).compile();

    service = module.get<LivreurService>(LivreurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
