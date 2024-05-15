import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const appConfig: ConfigService = app.get(ConfigService);
  const appPort: number = appConfig.get<number>('port');
  await app.listen(appPort);
  
}
bootstrap();
