import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserInfoDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: UserInfoDto[] = [
        {
          firstName: 'User1',
          lastName: 'User1',
          address: 'Address1',
          phoneNumber: 1234567890,
          email: 'user1@test.com',
          username: 'user1',
          isActive: true,
          isAdmin: false,
          isVerified: true,
          isOwner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest
        .spyOn(userService, 'findAllUsers')
        .mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return user info', async () => {
      const result: UserInfoDto = {
        firstName: 'User1',
        lastName: 'User1',
        address: 'Address1',
        phoneNumber: 1234567890,
        email: 'user1@test.fr',
        username: 'user1',
        isActive: true,
        isAdmin: false,
        isVerified: true,
        isOwner: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const param = 'someparam';
      jest
        .spyOn(userService, 'getUserInfo')
        .mockImplementation(async () => result);

      expect(await controller.findOne(param)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update user info', async () => {
      const param = 'someparam';
      const updateUserDto: UpdateUserDto = {
        firstName: 'Updated',
        lastName: 'User',
        address: 'Updated Address',
        phoneNumber: 987654321,
        email: 'test@test.sn',
        username: 'updateduser',
        password: 'password',
      };
      const updatedUser: UserInfoDto = {
        firstName: 'Updated',
        lastName: 'User',
        address: 'Updated Address',
        phoneNumber: 987654321,
        email: 'test@test2.fr',
        username: 'updateduser',
        isActive: true,
        isAdmin: false,
        isVerified: true,
        isOwner: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(userService, 'updateUser')
        .mockImplementation(async () => updatedUser);

      expect(await controller.update(param, updateUserDto)).toBe(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const param = 'someparam';
      const deletedUser: UserInfoDto = {
        firstName: 'User1',
        lastName: 'User1',
        address: 'Address1',
        phoneNumber: 1234567890,
        email: 'test@test.wws',
        username: 'user1',
        isActive: true,
        isAdmin: false,
        isVerified: true,
        isOwner: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(userService, 'removeUser')
        .mockImplementation(async () => deletedUser);

      expect(await controller.remove(param)).toBe(deletedUser);
    });
  });
});
