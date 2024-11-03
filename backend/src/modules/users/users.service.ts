import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isActive: user.isActive,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isActive: user.isActive,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as UserResponseDto;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async update(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<UserResponseDto> {
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.update(id, { isActive: false });
  }
}
