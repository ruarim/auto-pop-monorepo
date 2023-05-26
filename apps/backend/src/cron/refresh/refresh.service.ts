import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { RefreshIntervals } from 'src/modules/users/entities/user.entity';
import { UserRepository } from 'src/modules/users/repositories/user.respository';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RefreshCronService {
  constructor(private readonly userRepository: UserRepository) {}

  @Cron(CronExpression.EVERY_3_HOURS)
  async handle3HourRefreshCron() {
    const jobs = await this.findJobs(3);

    for (const job of jobs) {
      // for each item in shop
      // refresh
      // const response = await axios.post('https://example.com/api', {
      //   jobData: job.data,
      // });
    }
  }

  //6hour cron

  //12 hour cron

  //share product type from frontend code?

  //share refresh function from frontend code?

  private async refresh(product, user) {
    //increment users refreshes for each call
  }

  private async findJobs(interval: RefreshIntervals) {
    return await this.userRepository.find({
      where: { refreshSchedule: interval },
    });
  }
}
