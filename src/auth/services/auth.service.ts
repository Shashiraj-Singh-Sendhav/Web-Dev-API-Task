import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/services/user.service';
import { LoginUserDto } from '../models/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const query = { email: email };
    const user = await this.userService.findOneUser(query);
  }

  login(user: LoginUserDto): Promise<any> {
    return;
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<any> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateJwtToken(user: any) {
    const payload = {
      given_name: user.given_name,
      family_name: user.family_name,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
