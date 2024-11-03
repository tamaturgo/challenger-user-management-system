import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with a hashed password', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      };

      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash' as any).mockResolvedValueOnce(hashedPassword);

      const newUser = { id: 1, ...createUserDto, password: hashedPassword };
      mockUserRepository.create.mockReturnValue(newUser);
      mockUserRepository.save.mockResolvedValue(newUser);

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(newUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, name: 'John' }];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(mockUserRepository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const user = { id: 1, name: 'John' };
      mockUserRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const updateUserDto = { name: 'Updated John' };
      const updatedUser = { id: 1, ...updateUserDto };

      mockUserRepository.update.mockResolvedValue(updatedUser);
      mockUserRepository.findOneBy.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);

      expect(mockUserRepository.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should deactivate a user', async () => {
      await service.remove(1);

      expect(mockUserRepository.update).toHaveBeenCalledWith(1, {
        isActive: false,
      });
    });
  });
});
