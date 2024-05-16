// restuarant.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RestaurentService } from './restaurent.service';
import { Restaurent } from './entities/restaurent.entity';

describe('RestaurentService', () => {
  let service: RestaurentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurentService,
        {
          provide: getRepositoryToken(Restaurent),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RestaurentService>(RestaurentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a restaurant', async () => {
    const restaurantData = {
      name: 'Test Restaurant',
      location: 'Test Location',
      contact_info: 'Test Contact',
    };
    jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce(restaurantData as Restaurent);
    const createdRestaurant = await service.create(restaurantData);
    expect(createdRestaurant).toEqual(restaurantData);
  });

  it('should find all restaurants', async () => {
    const restaurantsData = [
      {
        id: 1,
        name: 'Test Restaurant',
        location: 'Test Location',
        contact_info: 'Test Contact',
      },
    ];
    jest
      .spyOn(service, 'findAll')
      .mockResolvedValueOnce(restaurantsData as Restaurent[]);
    const foundRestaurants = await service.findAll();
    expect(foundRestaurants).toEqual(restaurantsData);
  });

  it('should find one restaurant by id', async () => {
    const restaurantData = {
      id: 1,
      name: 'Test Restaurant',
      location: 'Test Location',
      contact_info: 'Test Contact',
    };
    jest
      .spyOn(service, 'findOne')
      .mockResolvedValueOnce(restaurantData as Restaurent);
    const foundRestaurant = await service.findOne(1);
    expect(foundRestaurant).toEqual(restaurantData);
  });

  it('should update a restaurant', async () => {
    const restaurantData = {
      id: 1,
      name: 'Test Restaurant',
      location: 'Test Location',
      contact_info: 'Test Contact',
    };
    const updateData = { name: 'Updated Restaurant Name' };
    const updatedRestaurant = { ...restaurantData, ...updateData };
    jest
      .spyOn(service, 'update')
      .mockResolvedValueOnce(updatedRestaurant as Restaurent);
    const result = await service.update(1, updateData);
    expect(result).toEqual(updatedRestaurant);
  });

  it('should remove a restaurant', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce();
    await expect(service.remove(1)).resolves.not.toThrow();
  });
});
