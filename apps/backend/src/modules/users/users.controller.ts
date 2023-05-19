import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { SetDepopTokenDto } from './dto/set-depop-token-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('login')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post(':id/depopToken')
  setDepopToken(
    @Param('id') id: number,
    @Body() setDepopTokenDto: SetDepopTokenDto,
  ) {
    return this.usersService.setDepopToken(id, setDepopTokenDto.token);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getUser(@Request() request: any) {
    const user = request.user;
    return this.usersService.getUser(user);
  }

  //create refresh schedule

  //call schedule service here
  //@Get()
  //getRefreshSchedule(id: number){
  //return this.jobsService.findUserScheduleById({where: {id}})
  //}
}
