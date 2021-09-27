import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../models/signup.dto';
import { UpdateUserDto } from '../models/updateUser.dto';
import { UserService } from '../services/user.service';

@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  @ApiCreatedResponse({ description: 'Get all users' })
  findAll(): Promise<any[]> {
    try {
      return this.userService.findAllUser();
    } catch (error) {
      console.log('Something went wrong with find user api. ', error);
      return error;
    }
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiCreatedResponse({ description: 'Update user' })
  async update(
    @Param('id') id: number,
    @Body() user: UpdateResult,
  ): Promise<Observable<UpdateResult>> {
    try {
      let query = { id: id };
      const userData = await this.userService.findUser(query);
      if (!userData) throw new NotFoundException('User not found.');
      return this.userService.updateUser(id, user);
    } catch (error) {
      console.log('Something went wrong in update user api. ', error);
      return error;
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiCreatedResponse({ description: 'Delete user' })
  async delete(@Param('id') id: number): Promise<Observable<DeleteResult>> {
    try {
      let query = { id: id };
      const userData = await this.userService.findUser(query);
      if (!userData) throw new NotFoundException('User not found.');
      return this.userService.deleteUser(id);
    } catch (error) {
      console.log('Something went wrong in delete user api. ', error);
      return error;
    }
  }
}
