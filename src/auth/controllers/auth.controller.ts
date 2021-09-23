import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { LoginUserDto } from '../models/login.dto';
import { AuthService } from '../services/auth.service';
import { JwtGuard } from '../guard/jwt.guard';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    const { email } = user;
    const hashedPassword = await this.userService.findOneUser(email);
    const isPassword = await this.authService.comparePassword(
      user.password,
      hashedPassword,
    );
  }
}
