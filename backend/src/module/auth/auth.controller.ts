import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { LoginUserDto } from '../../dto/login-user.dto';
import { User } from '../../users/user.entity'; // Make sure the User entity is correctly imported

@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register route
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  // Login route
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    return this.authService.login(loginUserDto);
  }
}