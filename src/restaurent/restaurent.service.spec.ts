import { Test, TestingModule } from '@nestjs/testing';
import { RestaurentService } from './restaurent.service';

describe('RestaurentService', () => {
  let service: RestaurentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurentService],
    }).compile();

    service = module.get<RestaurentService>(RestaurentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
