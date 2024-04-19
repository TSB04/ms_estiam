import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
  ) {}

  async create(createCommandeDto: CreateCommandeDto) {
    return await this.commandeRepository.save(createCommandeDto);
  }

  async findAll(): Promise<Commande[]> {
    return await this.commandeRepository.find();
  }

  async findOne(id: number) {
    return 'This action returns a #${id} commande';
  }

  async update(
    id: number,
    updateCommandeDto: UpdateCommandeDto,
  ): Promise<Commande> {
    return this.commandeRepository.save({ id, ...updateCommandeDto });
  }

  async remove(id: number): Promise<void> {
    return this.commandeRepository.delete(id).then(() => undefined);
  }
}
