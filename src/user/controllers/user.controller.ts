import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../models/signup.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() user: CreateUserDto): Promise<any> {
    try {
      let query = { email: user.email };
      const userData = await this.userService.findUser(query);
      if (userData) throw new ConflictException('User already registered.');
      return this.userService.create(user);
    } catch (error) {
      console.log('Something went wrong in signup. ', error);
      return error;
    }
  }

  @Get()
  findAll(): Promise<any[]> {
    try {
      return this.userService.findAllUser();
    } catch (error) {
      console.log('Something went wrong with find user api. ', error);
      return error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: CreateUserDto,
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

  @Delete(':id')
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
