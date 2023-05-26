import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getShopProducts, refresh } from 'depop-utils';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RefreshCronService {
  constructor(private readonly usersService: UsersService) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async handle3HourRefreshCron() {
    const users = await this.usersService.findJobs(6);

    for (const user of users) {
      await this.refreshAllProducts(user);
    }
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async handle6HourRefreshCron() {
    const users = await this.usersService.findJobs(12);

    for (const user of users) {
      await this.refreshAllProducts(user);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handle12HourRefreshCron() {
    const users = await this.usersService.findJobs(24);

    for (const user of users) {
      await this.refreshAllProducts(user);
    }
  }

  async refreshAllProducts(user: User) {
    const products = (await getShopProducts(user.depopId)).flat();
    for (const product of products) {
      try {
        await refresh({
          slug: product.slug,
          accessToken: user.depopToken,
        });
        await this.usersService.incrementRequestCount(user);
      } catch (e) {
        console.log(e);
      }
      await this.delay(500);
    }
  }

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
}
