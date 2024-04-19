// src/restaurent/restaurent.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { UpdateRestaurentDto } from './dto/update-restaurent.dto';
import { Restaurent } from './entities/restaurent.entity';
@Injectable()
export class RestaurentService {
  constructor(
    @InjectRepository(Restaurent)
    private readonly restaurentRepository: Repository<Restaurent>,
  ) {}

  async create(createRestaurentDto: CreateRestaurentDto) {
    return await this.restaurentRepository.save(createRestaurentDto);
  }

  async findAll(): Promise<Restaurent[]> {
    return await this.restaurentRepository.find();
  }

  async findOne(id: number) {
    return await this.restaurentRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateRestaurentDto: UpdateRestaurentDto,
  ): Promise<Restaurent> {
    const existingRestaurent = await this.restaurentRepository.findOne({
      where: { id },
    });
    if (!existingRestaurent) {
      return null;
    }
    return await this.restaurentRepository.save({
      ...existingRestaurent,
      ...updateRestaurentDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.restaurentRepository.delete(id);
  }
}
