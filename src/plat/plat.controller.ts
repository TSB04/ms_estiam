import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatService } from './plat.service';
import { CreatePlatDto } from './dto/create-plat.dto';
import { UpdatePlatDto } from './dto/update-plat.dto';

@Controller('plat')
export class PlatController {
  constructor(private readonly platService: PlatService) {}

  @Post()
  create(@Body() createPlatDto: CreatePlatDto) {
    return this.platService.create(createPlatDto);
  }

  @Get()
  findAll() {
    return this.platService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlatDto: UpdatePlatDto) {
    return this.platService.update(+id, updatePlatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platService.remove(+id);
  }
}
