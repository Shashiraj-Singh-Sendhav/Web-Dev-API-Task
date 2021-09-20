import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser(): string {
    return 'user created';
  }
  listUser(): string {
    return 'user list';
  }
  updateUser(): string {
    return 'user updated';
  }
  deleteUser(): string {
    return 'user deleted';
  }
}
