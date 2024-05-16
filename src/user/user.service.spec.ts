import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { username: 'testuser', password: 'testpassword', email: 'test@example.com' };
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = { ...createUserDto, password: hashedPassword };

    jest.spyOn(userModel, 'create').mockResolvedValueOnce(createdUser as any);
    const result = await service.createUser(createUserDto);
    expect(result).toEqual({
      email: 'test@example.com',
      username: 'testuser',
      isActive: undefined,
      isAdmin: undefined,
      isVerified: undefined,
      isOwner: undefined,
    });
  });

  it('should find all users', async () => {
    const usersData = [{ id: 1, username: 'testuser', email: 'test@example.com' }];
    jest.spyOn(userModel, 'find').mockResolvedValueOnce(usersData as any);
    const result = await service.findAllUsers();
    expect(result).toEqual(usersData);
  });

  it('should find one user by username', async () => {
    const userData = { id: 1, username: 'testuser', email: 'test@example.com' };
    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userData as any);
    const result = await service.findByUserName('testuser');
    expect(result).toEqual(userData);
  });

  it('should update a user', async () => {
    const userData = { id: 1, username: 'testuser', email: 'test@example.com' };
    const updateUserDto = { username: 'updateduser' };
    const updatedUser = { ...userData, ...updateUserDto };

    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userData as any);
    jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce(updatedUser as any);

    const result = await service.updateUser('testuser', updateUserDto);
    expect(result.message).toEqual([
      { property: 'username', constraints: { updated: 'has been updated successfully' } }
    ]);
  });

  it('should remove a user', async () => {
    const userData = { id: 1, username: 'testuser', email: 'test@example.com' };

    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userData as any);
    jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValueOnce(userData as any);

    const result = await service.removeUser('testuser');
    expect(result).toEqual({ message: 'testuser has been deleted successfully' });
  });
});
