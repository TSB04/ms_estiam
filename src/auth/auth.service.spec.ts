import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateJwtToken', () => {
    it('should generate a JWT token', async () => {
      // Arrange
      const user: User = {
        id: 1,
        username: 'testuser',
        password: 'testpassword',
        validatePassword: function (password: string): Promise<boolean> {
          throw new Error('Function not implemented.');
        },
      };
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      // Act
      const result = await service.generateJwtToken(user);

      // Assert
      expect(result).toEqual('token');
    });
  });

  describe('validateJwtToken', () => {
    it('should validate a JWT token', async () => {
      // Arrange
      const token = 'valid_token';
      jest
        .spyOn(jwtService, 'verify')
        .mockReturnValue({ username: 'testuser', sub: 1 });

      // Act
      const result = await service.validateJwtToken(token);

      // Assert
      expect(result).toEqual({ username: 'testuser', sub: 1 });
    });

    it('should throw an error for an invalid token', async () => {
      // Arrange
      const token = 'invalid_token';
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act & Assert
      await expect(service.validateJwtToken(token)).rejects.toThrowError(
        'Invalid token',
      );
    });
  });
});
