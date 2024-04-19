import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurentDto } from './create-restaurent.dto';

export class UpdateRestaurentDto extends PartialType(CreateRestaurentDto) {}
