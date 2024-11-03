import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data (without password) when credentials are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password',
        mockUser.password,
      );
      expect(result).toEqual({ id: 1, email: 'test@example.com' });
    });

    it('should return null when user is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await authService.validateUser(
        'invalid@example.com',
        'password',
      );

      expect(usersService.findByEmail).toHaveBeenCalledWith(
        'invalid@example.com',
      );
      expect(result).toBeNull();
    });

    it('should return null when password does not match', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(false);

      const result = await authService.validateUser(
        'test@example.com',
        'wrong-password',
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrong-password',
        mockUser.password,
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a JWT access token for the user', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      const token = 'mockJwtToken';

      mockJwtService.sign.mockReturnValue(token);

      const result = await authService.login(mockUser);

      const payload = { username: 'test@example.com', sub: 1 };

      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({ access_token: token });
    });
  });
});
