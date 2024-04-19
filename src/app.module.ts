import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RestaurentModule } from './restaurent/restaurent.module';
import { PlatModule } from './plat/plat.module';
import { CommandeModule } from './commande/commande.module';
import { LivreurModule } from './livreur/livreur.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'dbms',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RestaurentModule,
    PlatModule,
    CommandeModule,
    LivreurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
