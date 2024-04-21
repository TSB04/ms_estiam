import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { Livreur } from './entities/livreur.entity';
import { UpdateLivreurDto } from './dto/update-livreur.dto';

@Injectable()
export class LivreurService {
  constructor(
    @InjectRepository(Livreur)
    private readonly livreurRepository: Repository<Livreur>,
  ) {}

  async create(createLivreurDto: CreateLivreurDto) {
    return await this.livreurRepository.save(createLivreurDto);
  }

  async findAll(): Promise<Livreur[]> {
    return await this.livreurRepository.find();
  }

  async findOne(id: number) {
    return await this.livreurRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateLivreurDto: UpdateLivreurDto,
  ): Promise<Livreur> {
    const existingLivreur = await this.livreurRepository.findOne({
      where: { id },
    });
    if (!existingLivreur) {
      return null;
    }
    return await this.livreurRepository.save({
      ...existingLivreur,
      ...updateLivreurDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.livreurRepository.delete(id);
  }
}
