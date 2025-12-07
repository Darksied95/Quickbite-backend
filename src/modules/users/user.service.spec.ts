import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { DRIZZLE } from 'src/database/drizzle.module';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { CreateUserDTO } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let mockDb: any;
  let mockUser: CreateUserDTO;

  beforeEach(async () => {
    mockUser = {
      email: 'test@gmail.com',
      first_name: 'Test',
      last_name: 'User',
      password: 'password',
      role: 'customer' as const,
      phone: '+234701232132',
    };

    mockDb = {
      query: {
        users: {
          findFirst: jest.fn(),
        },
      },
      select: jest.fn(),
      insert: jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn(),
        }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DRIZZLE,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('getUserWithEmail', () => {
    it('should return user when found', async () => {
      mockDb.query.users.findFirst.mockResolvedValue(mockUser);

      const result = await service.getUserWithEmail('test@gmail.com');

      expect(result).toEqual(mockUser);
      expect(mockDb.query.users.findFirst).toHaveBeenCalledTimes(1);
    });

    it('should throw UserNotFoundException when user not found', async () => {
      mockDb.query.users.findFirst.mockResolvedValue(undefined);

      await expect(
        service.getUserWithEmail('notfound@example.com'),
      ).rejects.toThrow(UserNotFoundException);
    });
  });

  describe('create', () => {
    it('should return a user', async () => {
      mockDb.query.users.findFirst.mockResolvedValue(undefined);
      mockDb.insert().values().returning.mockResolvedValue([mockUser]);

      const result = await service.create(mockUser, mockDb);
      expect(result).toEqual(mockUser);
      expect(mockDb.query.users.findFirst).toHaveBeenCalledTimes(1);
      expect(mockDb.insert).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException if email already exists', async () => {
      mockDb.query.users.findFirst.mockResolvedValue(mockUser);
      const result = service.create(mockUser, mockDb);

      await expect(result).rejects.toThrow(ConflictException);
    });
  });
});
