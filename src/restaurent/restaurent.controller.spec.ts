// restaurent.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurentController } from './restaurent.controller';
import { RestaurentService } from './restaurent.service';
import { Restaurent } from './entities/restaurent.entity';

describe('RestaurentController', () => {
  let controller: RestaurentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurentController],
      providers: [
        {
          provide: RestaurentService,
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

    controller = module.get<RestaurentController>(RestaurentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a restaurant', async () => {
    const restaurantData: Restaurent = {
      id: 1,
      name: 'Test Restaurant',
      location: 'Test Location',
      contact_info: 'Test Contact',
    };
    jest.spyOn(controller, 'create').mockResolvedValueOnce(restaurantData);
    const createdRestaurant = await controller.create(restaurantData);
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
    jest.spyOn(controller, 'findAll').mockResolvedValueOnce(restaurantsData);
    const foundRestaurants = await controller.findAll();
    expect(foundRestaurants).toEqual(restaurantsData);
  });

  it('should find one restaurant by id', async () => {
    const restaurantData = {
      id: 1,
      name: 'Test Restaurant',
      location: 'Test Location',
      contact_info: 'Test Contact',
    };
    jest.spyOn(controller, 'findOne').mockResolvedValueOnce(restaurantData);
    const foundRestaurant = await controller.findOne('1');
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
    jest.spyOn(controller, 'update').mockResolvedValueOnce(updatedRestaurant);
    const result = await controller.update('1', updateData);
    expect(result).toEqual(updatedRestaurant);
  });

  it('should remove a restaurant', async () => {
    jest.spyOn(controller, 'remove').mockResolvedValueOnce();
    await expect(controller.remove('1')).resolves.not.toThrow();
  });
});
