// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const userData = { username: 'testuser', password: 'testpassword' };
    jest.spyOn(service, 'create').mockResolvedValueOnce(userData as User);
    const createdUser = await service.create(userData);
    expect(createdUser).toEqual(userData);
  });

  it('should find all users', async () => {
    const usersData = [
      { id: 1, username: 'testuser', password: 'testpassword' },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(usersData as User[]);
    const foundUsers = await service.findAll();
    expect(foundUsers).toEqual(usersData);
  });

  it('should find one user by id', async () => {
    const userData = { id: 1, username: 'testuser', password: 'testpassword' };
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(userData as User);
    const foundUser = await service.findOne(1);
    expect(foundUser).toEqual(userData);
  });

  it('should update a user', async () => {
    const userData = { id: 1, username: 'testuser', password: 'testpassword' };
    const updateData = { username: 'updateduser' };
    const updatedUser = { ...userData, ...updateData };
    jest.spyOn(service, 'update').mockResolvedValueOnce(updatedUser as User);
    const result = await service.update(1, updateData);
    expect(result).toEqual(updatedUser);
  });

  it('should remove a user', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce();
    await expect(service.remove(1)).resolves.not.toThrow();
  });
});
