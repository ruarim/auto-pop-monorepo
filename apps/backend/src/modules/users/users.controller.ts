import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { SetDepopTokenDto } from './dto/set-depop-token-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('login')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.findUser(loginUserDto);
  }

  @Post(':id/depopToken')
  setDepopToken(
    @Param('id') id: number,
    @Body() setDepopTokenDto: SetDepopTokenDto,
  ) {
    return this.usersService.setDepopToken(id, setDepopTokenDto.token);
  }

  //create refresh schedule

  //call schedule service here
  //@Get()
  //getRefreshSchedule(id: number){
  //return this.jobsService.findUserScheduleById({where: {id}})
  //}
}
