import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserData } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserData): Observable<UserData> {
    return this.userService.create(user);
  }

  @Get()
  findAll(): Observable<UserData[]> {
    return this.userService.findAllUser();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: UserData,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
