import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { LoginUserDto } from '../models/login.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async hashPassword(password: string): Promise<any> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<any> {
    return bcrypt.compare(password, hashedPassword);
  }
}
