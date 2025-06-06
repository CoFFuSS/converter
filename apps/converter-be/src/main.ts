/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Логирование конфигурации для отладки
  const logger = new Logger('Bootstrap');
  logger.log(`🔧 NODE_ENV: ${configService.get('nodeEnv')}`);
  logger.log(`🔧 PORT: ${configService.get('port')}`);
  logger.log(`🔧 DATABASE_HOST: ${configService.get('database.host')}`);
  logger.log(`🔧 DATABASE_PORT: ${configService.get('database.port')}`);
  logger.log(`🔧 DATABASE_USERNAME: ${configService.get('database.username')}`);
  logger.log(`🔧 DATABASE_NAME: ${configService.get('database.database')}`);

  // Настройка Swagger
  const port = configService.get<number>('port');
  const globalPrefix = 'api';

  const config = new DocumentBuilder()
    .setTitle('Converter Backend API')
    .setDescription('API документация для Converter Backend')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/${globalPrefix}`, 'Development server')
    .addServer(
      `http://localhost:${port}`,
      'Development server (without prefix)'
    )
    .addTag('conversion', 'Операции с валютами')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      tryItOutEnabled: true,
    },
  });

  // Включаем CORS для frontend
  app.enableCors({
    origin: configService.get<string>('corsOrigin'),
    credentials: true,
  });

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `📚 Swagger documentation: http://localhost:${port}/${globalPrefix}/docs`
  );
}

bootstrap();
