import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';

@Controller('livreur')
export class LivreurController {
  constructor(private readonly livreurService: LivreurService) {}

  @Post()
  create(@Body() createLivreurDto: CreateLivreurDto) {
    return this.livreurService.create(createLivreurDto);
  }

  @Get()
  findAll() {
    return this.livreurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livreurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLivreurDto: UpdateLivreurDto) {
    return this.livreurService.update(+id, updateLivreurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livreurService.remove(+id);
  }
}
