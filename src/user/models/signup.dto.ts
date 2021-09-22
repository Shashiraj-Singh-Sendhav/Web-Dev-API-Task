import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isNotEmpty, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 12)
  given_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 12)
  family_name: string;
}
