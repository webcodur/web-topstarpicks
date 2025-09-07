import { Provider } from '@nestjs/common';
import { DatabaseService } from './database.service';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (databaseService: DatabaseService) => databaseService.getDatabase(),
    inject: [DatabaseService],
  },
];