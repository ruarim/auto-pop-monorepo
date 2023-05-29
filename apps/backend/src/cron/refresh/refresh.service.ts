import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getShopProducts, refresh } from 'depop-utils';
import { RefreshIntervals as RefreshInterval } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RefreshCronService {
  constructor(private readonly usersService: UsersService) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async handle6HourRefreshCron() {
    await this.refreshAllProducts(6);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async handle12HourRefreshCron() {
    await this.refreshAllProducts(12);
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handle24HourRefreshCron() {
    await this.refreshAllProducts(24);
  }

  async refreshAllProducts(interval: RefreshInterval) {
    const users = await this.usersService.findJobs(interval);

    for (const user of users) {
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
  }

  delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
}
