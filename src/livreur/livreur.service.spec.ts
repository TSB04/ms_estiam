import { Test, TestingModule } from '@nestjs/testing';
import { LivreurService } from './livreur.service';
import { Livreur } from './entities/livreur.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

describe('LivreurService', () => {
  let service: LivreurService;
  let repository: Repository<Livreur>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LivreurService,
        {
          provide: getRepositoryToken(Livreur),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LivreurService>(LivreurService);
    repository = module.get<Repository<Livreur>>(getRepositoryToken(Livreur));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a livreur', async () => {
    const livreurData: Livreur = {
      id: 1,
      name: 'John Doe',
      contact_info: '123456789',
      vehicle_type: 'Car',
      availability: true,
    };
    jest.spyOn(repository, 'save').mockResolvedValueOnce(livreurData);
    const result = await service.create(livreurData);
    expect(result).toEqual(livreurData);
  });

  it('should find all livreurs', async () => {
    const livreursData: Livreur[] = [
      {
        id: 1,
        name: 'John Doe',
        contact_info: '123456789',
        vehicle_type: 'Car',
        availability: true,
      },
      {
        id: 2,
        name: 'Jane Doe',
        contact_info: '987654321',
        vehicle_type: 'Bike',
        availability: false,
      },
    ];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(livreursData);
    const result = await service.findAll();
    expect(result).toEqual(livreursData);
  });

  it('should find one livreur by id', async () => {
    const livreurData: Livreur = {
      id: 1,
      name: 'John Doe',
      contact_info: '123456789',
      vehicle_type: 'Car',
      availability: true,
    };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(livreurData);
    const result = await service.findOne(1);
    expect(result).toEqual(livreurData);
  });

  it('should update a livreur', async () => {
    const livreurData: Livreur = {
      id: 1,
      name: 'John Doe',
      contact_info: '123456789',
      vehicle_type: 'Car',
      availability: true,
    };
    const updateData = { name: 'Jane Smith' };
    const updatedLivreur = { ...livreurData, ...updateData };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(livreurData);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedLivreur);
    const result = await service.update(1, updateData);
    expect(result).toEqual(updatedLivreur);
  });

  it('should remove a livreur', async () => {
    const deleteResult: DeleteResult = {
      affected: 1,
      raw: null,
    };
    jest.spyOn(repository, 'delete').mockResolvedValueOnce(deleteResult);
    await expect(service.remove(1)).resolves.toEqual(undefined);
  });
});
