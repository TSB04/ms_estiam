import { Test, TestingModule } from '@nestjs/testing';
import { PlatController } from './plat.controller';
import { PlatService } from './plat.service';

describe('PlatController', () => {
  let controller: PlatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatController],
      providers: [PlatService],
    }).compile();

    controller = module.get<PlatController>(PlatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
