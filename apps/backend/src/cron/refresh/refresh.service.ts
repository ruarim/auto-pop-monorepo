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
      try {
        const products = (await getShopProducts(user.depopId)).flat();

        for (const product of products) {
          if (product.sold) continue;

          await refresh({
            slug: product.slug,
            accessToken: user.depopToken,
          });
          await this.usersService.incrementRequestCount(user);

          await this.delay(500);
        }
      } catch (e) {
        const { formattedDate, formattedTime } = this.getDateTime();
        e = e as Error;
        console.log(
          `${formattedDate} ${formattedTime} - Failed to refresh products for user ${
            user.id + ' ' + user.depopId
          }: ${e.message} stack: ${e.stack}`,
        );
      }
    }
  }

  private getDateTime() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    return { formattedDate, formattedTime };
  }

  private delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
}
