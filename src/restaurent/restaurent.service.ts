import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createRestaurentDto: CreateRestaurentDto): Promise<Restaurent> {
    return await this.restaurentRepository.save(createRestaurentDto);
  }

  async findAll(): Promise<Restaurent[]> {
    return await this.restaurentRepository.find();
  }

  async findOne(id: number): Promise<Restaurent | null> {
    const restaurent = await this.restaurentRepository.findOne({
      where: { id },
    });
    if (!restaurent) {
      return null;
    }
    return restaurent;
  }

  async update(
    id: number,
    updateRestaurentDto: UpdateRestaurentDto,
  ): Promise<Restaurent | null> {
    const existingRestaurent = await this.findOne(id);
    if (!existingRestaurent) {
      return null;
    }
    const updatedRestaurent = { ...existingRestaurent, ...updateRestaurentDto };
    return await this.restaurentRepository.save(updatedRestaurent);
  }

  async remove(id: number): Promise<void> {
    await this.restaurentRepository.delete(id);
  }
}
