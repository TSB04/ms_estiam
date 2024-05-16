import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('commande')
export class CommandeController {
  findAllByUser(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly commandeService: CommandeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommandeDto: CreateCommandeDto, @Req() req) {
    return this.commandeService.create(createCommandeDto, req.user.id);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    if (!req.user) {
      throw new NotFoundException('User not found');
    }
    return this.commandeService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}
