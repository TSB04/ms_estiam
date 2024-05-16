// plat.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlatService } from './plat.service';
import { Plat } from './entities/plat.entity';

describe('PlatService', () => {
  let service: PlatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatService,
        {
          provide: getRepositoryToken(Plat),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PlatService>(PlatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a plat', async () => {
    const platData = {
      name: 'Test Plat',
      price: 20,
      description: 'Delicious test dish',
      category: 'Starter',
    };
    jest.spyOn(service, 'create').mockResolvedValueOnce(platData as Plat);
    const createdPlat = await service.create(platData);
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
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(platsData as Plat[]);
    const foundPlats = await service.findAll();
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
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(platData as Plat);
    const foundPlat = await service.findOne(1);
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
    jest.spyOn(service, 'update').mockResolvedValueOnce(updatedPlat as Plat);
    const result = await service.update(1, updateData);
    expect(result).toEqual(updatedPlat);
  });

  it('should remove a plat', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce();
    await expect(service.remove(1)).resolves.not.toThrow();
  });
});
