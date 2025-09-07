import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (matching Express setup)
  app.enableCors();

  // Enable global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Set global prefix for API routes
  app.setGlobalPrefix('api');

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('TopStarPicks API')
    .setDescription('The TopStarPicks API documentation')
    .setVersion('1.0')
    .addTag('celebrities', 'Celebrity management endpoints')
    .addTag('recommendations', 'Content recommendations endpoints')
    .addTag('content', 'Content management endpoints')
    .addTag('profession', 'Profession categories endpoints')
    .addTag('ai', 'AI integration endpoints')
    .addTag('crawl', 'Web scraping endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
  console.log(`Application is running on: http://localhost:${port}/api`);
  console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();