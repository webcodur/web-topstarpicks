import { Module } from '@nestjs/common';
import { CelebritiesService } from './celebrities.service';
import { CelebritiesController } from './celebrities.controller';

@Module({
  controllers: [CelebritiesController],
  providers: [CelebritiesService],
  exports: [CelebritiesService],
})
export class CelebritiesModule {}