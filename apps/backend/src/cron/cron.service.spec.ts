import { Test, TestingModule } from '@nestjs/testing';
import { RefreshCronService } from './cron.service';

describe('CronService', () => {
  let service: RefreshCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshCronService],
    }).compile();

    service = module.get<RefreshCronService>(RefreshCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
