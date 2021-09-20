import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserData } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(user: UserData): Observable<UserData> {
    return from(this.userRepository.save(user));
  }

  findAllUser(): Observable<UserData[]> {
    return from(this.userRepository.find());
  }

  updateUser(id: number, user: UserData): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }

  deleteUser(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }
}
