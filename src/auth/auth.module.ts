import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';
import { UserService } from 'src/user/services/user.service';
// import { config } from 'dotenv';
// config();

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '5m' },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, UserService, JwtGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
