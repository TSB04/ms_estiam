import { UserService } from './user/user.service';
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LogUserDto } from './user/dto/log-user.dto';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('auth/login')
  async login(
    @Body() logUserDto: LogUserDto,
  ): Promise<{ access_token: string }> {
    const res = await this.authService.validateUser(logUserDto);
    return res;
  }

  @Post('auth/register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    // Create a new user
    const newUser = await this.userService.createUser(createUserDto);

    // Validate the newly registered user
    const res = await this.authService.validateUser({
      username: newUser.username,
      password: createUserDto.password,
    });

    return res;
  }
}
