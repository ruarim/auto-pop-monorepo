import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async signIn(@Body() loginUserDto: UserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('depopUser')
  @UseGuards(JwtAuthGuard)
  setDepopToken(
    @Body() setDepopUserDto: UpdateUserDto,
    @Request() request: { user: User },
  ) {
    const user = request.user;
    return this.usersService.setDepopUser(
      user,
      setDepopUserDto.token,
      setDepopUserDto.depopId,
    );
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getUser(@Request() request: { user: User }) {
    const user = request.user;
    return this.usersService.getUser(user);
  }

  @Post('refreshSchedule')
  @UseGuards(JwtAuthGuard)
  setRefreshSchedule(
    @Body() setScheduleDto: UpdateUserDto,
    @Request() request: { user: User },
  ) {
    const user = request.user;
    const schedule = setScheduleDto.schedule;

    return this.usersService.setRefreshSchedule(schedule, user);
  }
}
