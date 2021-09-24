import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/models/login.dto';
import { CreateUserDto } from 'src/user/models/signup.dto';
import { UserService } from 'src/user/services/user.service';
import { JwtGuard } from '../guard/jwt.guard';
import { AuthService } from '../services/auth.service';
import Payload from '../models/payload.interface';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'Create user' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() user: CreateUserDto): Promise<any> {
    try {
      let query = { email: user.email };
      const userData = await this.userService.findUser(query);
      if (userData)
        throw new HttpException(
          'User already registered.',
          HttpStatus.CONFLICT,
        );
      return await this.userService.create(user);
    } catch (error) {
      console.log('Something went wrong in signup. ', error);
      return error;
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    try {
      const query = { email: loginUserDto.email };
      const { password } = loginUserDto;
      const userData = await this.userService.findUser(query);
      if (!userData) throw new BadRequestException('no user found');
      const hashedPassword = userData.password;
      const isPassword = await this.authService.comparePassword(
        password,
        hashedPassword,
      );
      console.log('isPassword', password, hashedPassword, isPassword);
      if (!isPassword) throw new BadRequestException('Incorrect Password.');

      const payload: Payload = {
        email: userData.email,
        given_name: userData.given_name,
        family_name: userData.family_name,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log('Something went wrong in login user api. ', error);
      return error;
    }
  }
}
