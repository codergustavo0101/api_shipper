import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import { AppModule } from './app.module';

import SwaggerConfig from './config/swagger/swagger.conf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, SwaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT || 3000);
}

bootstrap()
  .then(() => console.log(`Server running on port ${process.env.PORT || 3000}`))
  .catch((err) => console.log(err));
