import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livreur } from './entities/livreur.entity';
import { LivreurService } from './livreur.service';
import { LivreurController } from './livreur.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Livreur])],
  controllers: [LivreurController],
  providers: [LivreurService],
  exports: [LivreurService],
})
export class LivreurModule {}
