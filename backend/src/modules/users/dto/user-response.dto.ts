import {
  IsEmail,
  IsString,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';

export class UserResponseDto {

  @IsNumber()
  id: number

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isActive?: boolean;

  @IsString()
  role: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
