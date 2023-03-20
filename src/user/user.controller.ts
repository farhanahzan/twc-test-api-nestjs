import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Post, Body, Get } from '@nestjs/common';
import { SignUPDto } from './dto/signup-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  signUp(
    @Body()
    signUp: SignUPDto,
  ): Promise<{ token: String }> {
    return this.userService.signUp(signUp);
  }

  @Get()
  login(
    @Body()
    loginDto: LoginDto,
  ): Promise<{ token: string }> {
    return this.userService.logIn(loginDto);
  }
}
