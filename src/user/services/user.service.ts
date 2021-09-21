import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../models/signup.dto';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(user: CreateUserDto): Promise<any> {
    return this.userRepository.save(user);
  }

  findAllUser(): Promise<any[]> {
    return this.userRepository.find();
  }

  updateUser(id: number, user: CreateUserDto): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }

  deleteUser(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }
}
