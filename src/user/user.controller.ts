import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':param')
  findOne(@Query('param') param: string) {
    return this.userService.getUserInfo(param);
  }

  @Patch(':param')
  update(@Query('param') param: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(param, updateUserDto);
  }

  @Delete(':param')
  remove(@Query('param') param: string) {
    return this.userService.removeUser(param);
  }
}
