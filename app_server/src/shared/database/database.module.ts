import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { databaseProviders } from './database.provider';

@Global()
@Module({
  providers: [DatabaseService, ...databaseProviders],
  exports: [DatabaseService, ...databaseProviders],
})
export class DatabaseModule {}