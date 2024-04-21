import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService ) {}

  async generateJwtToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateJwtToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.usersService.findByUsername(username);
    if (!user || !await user.validatePassword(password)) {
      throw new Error('Invalid username or password');
    }
    const token = await this.generateJwtToken(user);
    return { token };
  }

}
