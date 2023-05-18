import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(userDto: CreateUserDto) {
    const { email, password } = userDto;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = this.userRepository.create({ email, password });
    await this.userRepository.save(newUser);

    return this.buildReturnObject(newUser);
  }

  async findOne(userDto: LoginUserDto) {
    const { email, password } = userDto;

    const user = await this.findByEmail(email);

    if (!user) throw new NotFoundException('User does not exists');

    if (await argon2.verify(user.password, password))
      return this.buildReturnObject(user);
    else throw new UnauthorizedException('incorrect password');
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  private buildReturnObject(user: User) {
    const returnUser = {
      id: user.id,
      email: user.email,
      token: this.generateJWT(user),
    };
    return returnUser;
  }

  public generateJWT(user: User) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}
