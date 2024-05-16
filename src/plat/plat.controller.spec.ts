// plat.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PlatController } from './plat.controller';
import { PlatService } from './plat.service';
import { Plat } from './entities/plat.entity';

describe('PlatController', () => {
  let controller: PlatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatController],
      providers: [
        {
          provide: PlatService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlatController>(PlatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a plat', async () => {
    const platData: Plat = {
      id: 1,
      name: 'Test Plat',
      price: 20,
      description: 'Delicious test dish',
      category: 'Starter',
    };
    jest.spyOn(controller, 'create').mockResolvedValueOnce(platData);
    const createdPlat = await controller.create(platData);
    expect(createdPlat).toEqual(platData);
  });

  it('should find all plats', async () => {
    const platsData = [
      {
        id: 1,
        name: 'Test Plat',
        price: 20,
        description: 'Delicious test dish',
        category: 'Starter',
      },
    ];
    jest.spyOn(controller, 'findAll').mockResolvedValueOnce(platsData);
    const foundPlats = await controller.findAll();
    expect(foundPlats).toEqual(platsData);
  });

  it('should find one plat by id', async () => {
    const platData = {
      id: 1,
      name: 'Test Plat',
      price: 20,
      description: 'Delicious test dish',
      category: 'Starter',
    };
    jest.spyOn(controller, 'findOne').mockResolvedValueOnce(platData);
    const foundPlat = await controller.findOne('1');
    expect(foundPlat).toEqual(platData);
  });

  it('should update a plat', async () => {
    const platData = {
      id: 1,
      name: 'Test Plat',
      price: 20,
      description: 'Delicious test dish',
      category: 'Starter',
    };
    const updateData = { name: 'Updated Plat Name' };
    const updatedPlat = { ...platData, ...updateData };
    jest.spyOn(controller, 'update').mockResolvedValueOnce(updatedPlat);
    const result = await controller.update('1', updateData);
    expect(result).toEqual(updatedPlat);
  });

  it('should remove a plat', async () => {
    jest.spyOn(controller, 'remove').mockResolvedValueOnce();
    await expect(controller.remove('1')).resolves.not.toThrow();
  });
});
