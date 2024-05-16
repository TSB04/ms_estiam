import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LogUserDto } from '../user/dto/log-user.dto';
import { UserPrivilegeDto } from '../user/dto/response-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    logUserDto: LogUserDto,
  ): Promise<{ access_token: string }> {
    const { username, password } = logUserDto;
    const user = await this.usersService.findByUserName(username);
    await this.usersService.comparePasswords(password, user.password);

    // Create and return a UserPrivilegeDto
    const userResponseDto: UserPrivilegeDto = {
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      isOwner: user.isOwner,
    };

    // Generate token and return it along with the user information
    const token = this.jwtService.sign(userResponseDto);
    return { access_token: token };
  }
}
