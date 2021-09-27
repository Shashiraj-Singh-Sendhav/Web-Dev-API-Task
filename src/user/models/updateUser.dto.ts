import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isNotEmpty, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 15)
  given_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 15)
  family_name: string;
}
