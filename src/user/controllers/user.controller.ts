import {
  Body,
  Controller,
  Delete,
  Get,
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
  create(@Body() user: CreateUserDto): Promise<any> {
    return this.userService.create(user);
  }

  @Get()
  findAll(): Promise<any[]> {
    return this.userService.findAllUser();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: CreateUserDto,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
