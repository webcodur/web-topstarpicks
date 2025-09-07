import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import feature modules
import { CelebritiesModule } from './modules/celebrities/celebrities.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { ContentModule } from './modules/content/content.module';
import { ProfessionModule } from './modules/profession/profession.module';
import { AiModule } from './modules/ai/ai.module';
import { CrawlModule } from './modules/crawl/crawl.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Feature modules
    DatabaseModule,
    CelebritiesModule,
    RecommendationsModule,
    ContentModule,
    ProfessionModule,
    AiModule,
    CrawlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}