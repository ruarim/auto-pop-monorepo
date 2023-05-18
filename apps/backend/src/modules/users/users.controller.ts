import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('login')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.findOne(loginUserDto);
  }

  // @Post('depoptoken')
  // setDepopToken(@Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.setDepopToken(updateUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  //create refresh schedule

  //call schedule service here
  //@Get()
  //getRefreshSchedule(id: number){
  //return this.jobsService.findScheduleById({where: {id}})
  //}
}
