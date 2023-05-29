import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.respository';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import * as argon2 from 'argon2';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    findOne: jest.fn().mockImplementation(async (options) => {
      if (options.id === Date.now()) {
        const user = new User();
        user.id = Date.now();
        user.email = 'test@test.com';
        user.password = await argon2.hash('test');
        user.depopToken = 'token';
        return Promise.resolve(user);
      }
      return Promise.resolve(null);
    }),
    create: jest.fn().mockImplementation((userDto: UserDto) => {
      const newUser = new User();
      newUser.email = userDto.email;
      newUser.password = userDto.password;
      return newUser;
    }),
    save: jest.fn().mockImplementation((user: User) => {
      return { id: 1, email: user.email, token: 'token' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: ':memory:',
            entities: [User],
            synchronize: true,
            dropSchema: true,
          }),
        }),
        TypeOrmModule.forFeature([User, UserRepository]),
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
      ],
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
    };
    const result = await service.create(user);
    expect(result).toEqual({
      id: expect.any(Number),
      email: user.email,
      token: expect.any(String),
    });
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const email = 'test@test.com';
      const password = 'test';

      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce({
        id: Date.now(),
        email,
        password: await argon2.hash(password),
        depopToken: 'token',
        hashPassword: () => Promise.resolve(),
        requests: 0,
        refreshSchedule: 6,
        depopId: 0,
      });

      const result = await service.login({ email, password });

      expect(result).toEqual({
        id: expect.any(Number),
        email: email,
        token: expect.any(String),
      });
      expect(service.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw UnauthorizedException for incorrect password', async () => {
      const email = 'test@test.com';
      const incorrectPassword = 'incorrect_password';

      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce({
        id: Date.now(),
        email,
        password: await argon2.hash('test'),
        depopToken: 'token',
        hashPassword: () => Promise.resolve(),
        requests: 0,
        refreshSchedule: 6,
        depopId: 0,
      });

      await expect(
        service.login({ email, password: incorrectPassword }),
      ).rejects.toThrow(UnauthorizedException);
      expect(service.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw NotFoundException for non-existing user', async () => {
      const email = 'nonexisting@test.com';
      const password = 'test';

      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce(null);

      await expect(service.login({ email, password })).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  it('should set the depop token for a user', async () => {
    const user = new User();
    user.id = Date.now();
    user.email = 'test@test.com';
    user.password = 'test';
    user.depopToken = 'token';
    user.depopId = 1;

    jest.spyOn(service, 'findById').mockResolvedValueOnce(user);

    const result = await service.setDepopUser(
      user,
      user.depopToken,
      user.depopId,
    );

    expect(service.findById).toHaveBeenCalledWith(user.id);

    expect(result).toEqual({
      id: user.id,
      email: user.email,
      token: expect.any(String),
    });
  });
});
