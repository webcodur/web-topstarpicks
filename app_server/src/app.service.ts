import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'TopStarPicks NestJS API Server is running!';
  }
}