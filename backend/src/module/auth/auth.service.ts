// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/user.service';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { CreateUserDto } from '../../dto/create-user.dto';
import { LoginUserDto } from '../../dto/login-user.dto';
import { User } from '../../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {  
    return this.usersService.createUser(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {  
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { 
      email: user.email,
      sub: user.id,
      username: user.username 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}