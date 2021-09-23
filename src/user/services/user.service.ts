import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../models/signup.dto';
import { UserEntity } from '../models/user.entity';
import { AuthService } from 'src/auth/services/auth.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService,
  ) {}

  async create(user: CreateUserDto): Promise<any> {
    const { password } = user;
    const hashedPassword = await this.AuthService.hashPassword(password);
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<any[]> {
    return this.userRepository.find();
  }

  findUser(userData): Promise<object> {
    return this.userRepository.findOne(userData);
  }

  updateUser(id: number, user: CreateUserDto): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }

  deleteUser(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  findOneUser(email: any): Promise<any> {
    return this.userRepository.findOne(email);
  }
}
