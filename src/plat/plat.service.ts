import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlatDto } from './dto/create-plat.dto';
import { Plat } from './entities/plat.entity';
import { UpdatePlatDto } from './dto/update-plat.dto';

@Injectable()
export class PlatService {
  constructor(
    @InjectRepository(Plat)
    private readonly platRepository: Repository<Plat>,
  ) {}

  async create(createPlatDto: CreatePlatDto) {
    return await this.platRepository.save(createPlatDto);
  }

  async findAll(): Promise<Plat[]> {
    return await this.platRepository.find();
  }

  async findOne(id: number) {
    return await this.platRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePlatDto: UpdatePlatDto): Promise<Plat> {
    const existingPlat = await this.platRepository.findOne({ where: { id } });
    if (!existingPlat) {
      return null;
    }
    return await this.platRepository.save({
      ...existingPlat,
      ...updatePlatDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.platRepository.delete(id);
  }
}
