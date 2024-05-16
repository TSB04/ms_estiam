import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, BadRequestException, ValidationError } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureCors(app);
  configureGlobalPipes(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000; // Provide a default port if not set

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

function configureCors(app) {
  app.enableCors({
    origin: 'https://ambitious-meadow-0f23cad03.5.azurestaticapps.net/',
  });
}

function configureGlobalPipes(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
    }),
  );
}

bootstrap();
