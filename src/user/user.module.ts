import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
