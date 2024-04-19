import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plat } from './entities/plat.entity';
import { PlatService } from './plat.service';
import { PlatController } from './plat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plat])],
  controllers: [PlatController],
  providers: [PlatService],
  exports: [PlatService],
})
export class PlatModule {}
