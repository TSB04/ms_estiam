import { Test, TestingModule } from '@nestjs/testing';
import { PlatService } from './plat.service';

describe('PlatService', () => {
  let service: PlatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatService],
    }).compile();

    service = module.get<PlatService>(PlatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
