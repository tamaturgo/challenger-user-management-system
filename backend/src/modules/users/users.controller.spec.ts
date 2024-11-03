import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

const mockUsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test',
      };
      const result: UserResponseDto = {
        id: 1,
        email: 'test@example.com',
        name: 'Test',
        isActive: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersService.create.mockResolvedValue(result);

      expect(await controller.create(createUserDto)).toEqual(result);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: UserResponseDto[] = [
        {
          id: 1,
          email: 'test1@example.com',
          name: 'Test1',
          isActive: true,
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: 'test2@example.com',
          name: 'Test2',
          isActive: true,
          role: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockUsersService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result: UserResponseDto = {
        id: 1,
        email: 'test@example.com',
        name: 'Test',
        isActive: true,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { email: 'newemail@example.com' };
      const result: UserResponseDto = {
        id: 1,
        email: 'newemail@example.com',
        name: 'Test',
        isActive: true,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersService.update.mockResolvedValue(result);

      expect(await controller.update(1, updateUserDto)).toEqual(result);
      expect(mockUsersService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should deactivate a user', async () => {
      const result = undefined;

      mockUsersService.remove.mockResolvedValue(result);

      expect(await controller.remove(1)).toEqual(result);
      expect(mockUsersService.remove).toHaveBeenCalledWith(1);
    });
  });
});
