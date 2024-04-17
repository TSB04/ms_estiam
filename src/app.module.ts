import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      "type": "mysql",
      "host": "127.0.0.1",
      "port": 3306,
      "username": "root",
      "password": "tsb0408",
      "database": "msdb",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true,
    }

  ), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
