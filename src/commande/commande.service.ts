import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { Commande } from './entities/commande.entity';
import { UserService } from '../user/user.service';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
    private readonly usersService: UserService,
  ) {}

  async create(createCommandeDto: CreateCommandeDto, userName: string) {
    const user = await this.usersService.findByUserName(userName);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const commande = new Commande();
    commande.user = user;
    commande.restaurant_id = createCommandeDto.restaurant_id;
    commande.plat_id = createCommandeDto.plat_id;
    commande.quantity = createCommandeDto.quantity;
    commande.date = createCommandeDto.date;
    return await this.commandeRepository.save(commande);
  }

  async findAllByUser(userName: string): Promise<Commande[]> {
    const user = await this.usersService.findByUserName(userName);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.commandeRepository.find({
      where: { user },
    });
  }

  async findOne(id: number): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({ where: { id } });
    if (!commande) {
      throw new NotFoundException(`Commande with id ${id} not found`);
    }
    return commande;
  }

  async update(
    id: number,
    updateCommandeDto: UpdateCommandeDto,
  ): Promise<Commande> {
    const existingCommande = await this.findOne(id);
    Object.assign(existingCommande, updateCommandeDto);
    return this.commandeRepository.save(existingCommande);
  }

  async remove(id: number): Promise<void> {
    const result = await this.commandeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Commande with id ${id} not found`);
    }
  }
}
