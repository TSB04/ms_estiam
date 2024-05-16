import { Test, TestingModule } from '@nestjs/testing';
import { LivreurController } from './livreur.controller';
import { LivreurService } from './livreur.service';

describe('LivreurController', () => {
  let controller: LivreurController;
  let service: LivreurService;

  beforeEach(async () => {
    const mockLivreurService = {
      create: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([])),
      findOne: jest
        .fn()
        .mockImplementation((id) => Promise.resolve({ id, name: 'John Doe' })),
      update: jest
        .fn()
        .mockImplementation((id, dto) => Promise.resolve({ ...dto, id })),
      remove: jest.fn().mockImplementation((id) => Promise.resolve({ id })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivreurController],
      providers: [
        {
          provide: LivreurService,
          useValue: mockLivreurService,
        },
      ],
    }).compile();

    controller = module.get<LivreurController>(LivreurController);
    service = module.get<LivreurService>(LivreurService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a livreur', async () => {
    const dto = {
      name: 'John',
      contact_info: '123456789',
      vehicle_type: 'Bike',
      availability: true,
    };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return array of livreurs', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one livreur', async () => {
    const id = 1;
    await controller.findOne(id.toString());
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update livreur', async () => {
    const id = 1;
    const dto = { name: 'Jane' };
    await controller.update(id.toString(), dto);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should delete livreur', async () => {
    const id = 1;
    await controller.remove(id.toString());
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
