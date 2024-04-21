import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Commande])],
  controllers: [CommandeController],
  providers: [CommandeService],
  exports: [CommandeService],
})
export class CommandeModule {}
