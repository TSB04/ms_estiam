import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfoDto, UserPrivilegeDto } from './dto/response-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserPrivilegeDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return this.mapUserPrvlgDto(newUser);
    } catch (error) {
      if (
        error.code === 11000 &&
        (error.keyValue.email || error.keyValue.username)
      ) {
        const property = error.keyValue.email ? 'email' : 'username';
        throw new BadRequestException({
          message: {
            property,
            constraints: { unique: `${property} already exists` },
          },
        });
      } else {
        throw new InternalServerErrorException(
          'User creation failed: ' + error.message,
        );
      }
    }
  }

  async findByUserName(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException({
        message: {
          property: 'username',
          constraints: { isValidUsername: 'username does not exist' },
        },
      });
    }
    return user;
  }

  async comparePasswords(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    if (!isMatch) {
      throw new BadRequestException({
        message: {
          property: 'password',
          constraints: { isValidPassword: 'password is incorrect' },
        },
      });
    }
    return isMatch;
  }

  async findAllUsers(): Promise<UserInfoDto[]> {
    const users = await this.userModel.find();
    return users.map(this.mapUserToInfoDto);
  }

  async getUserInfo(param: string): Promise<UserInfoDto> {
    const user = await this.userModel.findOne({
      $or: [{ email: param }, { username: param }],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.mapUserToInfoDto(user);
  }

  async updateUser(param: string, updateUserDto: UpdateUserDto): Promise<any> {
    const userId = await this.getUser(param);
    const originalUser = await this.userModel.findById(userId);

    if (!originalUser) {
      throw new NotFoundException('User not found');
    }

    // Apply the update
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    // Extract updated fields
    const updatedFields: Partial<UserInfoDto> = {};
    for (const key in updateUserDto) {
      if (
        updateUserDto.hasOwnProperty(key) &&
        originalUser[key] !== updatedUser[key]
      ) {
        updatedFields[key] = updatedUser[key];
      }
    }

    // Construct message objects
    const messages: any[] = [];
    for (const key in updatedFields) {
      if (updatedFields.hasOwnProperty(key)) {
        messages.push({
          property: key,
          constraints: {
            updated: 'has been updated successfully',
          },
        });
      }
    }

    return { message: messages };
  }

  async removeUser(param: string): Promise<any> {
    const userId = await this.getUser(param);
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: `${user.username} has been deleted successfully` };
  }

  private async getUser(param: string): Promise<any> {
    const userId = await this.userModel.findOne(
      { $or: [{ email: param }, { username: param }] },
      '_id',
    );
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    return userId;
  }

  private mapUserPrvlgDto(user: User): UserPrivilegeDto {
    const { email, username, isActive, isAdmin, isVerified, isOwner } = user;
    return { email, username, isActive, isAdmin, isVerified, isOwner };
  }

  private mapUserToInfoDto(user: User): UserInfoDto {
    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      username,
      isActive,
      isAdmin,
      isVerified,
      isOwner,
      createdAt,
      updatedAt,
    } = user;
    return {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      username,
      isActive,
      isAdmin,
      isVerified,
      isOwner,
      createdAt,
      updatedAt,
    };
  }
}
