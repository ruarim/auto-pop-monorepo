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
import { SetDepopTokenDto } from './dto/set-depop-token-dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { User } from './entities/user.entity';

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

  @Post('depopToken')
  @UseGuards(JwtAuthGuard)
  setDepopToken(
    @Body() setDepopTokenDto: SetDepopTokenDto,
    @Request() request: { user: User },
  ) {
    const user = request.user;
    return this.usersService.setDepopToken(user.id, setDepopTokenDto.token);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getUser(@Request() request: { user: User }) {
    const user = request.user as User;
    return this.usersService.getUser(user);
  }

  //create refresh schedule

  //call schedule service here
  //@Get()
  //getRefreshSchedule(id: number){
  //return this.jobsService.findUserScheduleById({where: {id}})
  //}
}
