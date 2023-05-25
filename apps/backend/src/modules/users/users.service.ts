import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { RefreshIntervals, User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { UserRepository } from './repositories/user.respository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(userDto: UserDto) {
    const { email, password } = userDto;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const newUser = this.userRepository.create({ email, password });
    await this.userRepository.save(newUser);

    return this.buildUserReturnObject(newUser);
  }

  async login(userDto: UserDto) {
    const { email, password } = userDto;

    const user = await this.findByEmail(email);

    if (!user) throw new NotFoundException('User does not exists');

    if (await argon2.verify(user.password, password))
      return this.buildUserReturnObject(user);
    else throw new UnauthorizedException('Incorrect password');
  }

  async setDepopUser(user: User, token: string, depopId: number) {
    user.depopToken = token;
    user.depopId = depopId;
    const updatedUser = await this.userRepository.save(user);

    return this.buildUserReturnObject(updatedUser);
  }

  async setRefreshSchedule(schedule: RefreshIntervals, user: User) {
    user.refreshSchedule = schedule;
    const updatedUser = await this.userRepository.save(user);

    return this.buildUserReturnObject(updatedUser);
  }

  async getUser(user: User) {
    return this.buildUserReturnObject(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  private buildUserReturnObject(user: User) {
    const returnUser = {
      id: user.id,
      email: user.email,
      token: this.generateJWT(user),
      depopId: user.depopId,
      schedule: user.refreshSchedule,
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
