import { IsEmail, isNotEmpty, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2, 12)
  given_name: string;

  @IsNotEmpty()
  @Length(2, 12)
  family_name: string;
}
