import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurent } from './entities/restaurent.entity';
import { RestaurentService } from './restaurent.service';
import { RestaurentController } from './restaurent.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurent])],
  controllers: [RestaurentController],
  providers: [RestaurentService],
  exports: [RestaurentService],
})
export class RestaurentModule {}
