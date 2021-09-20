import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/create')
  create(): string {
    return this.userService.createUser();
  }
  @Get('/list')
  list(): string {
    return this.userService.listUser();
  }
  @Get('/update')
  update(): string {
    return this.userService.updateUser();
  }
  @Get('/delete')
  delete(): string {
    return this.userService.deleteUser();
  }
}
