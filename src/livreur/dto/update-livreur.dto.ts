import { PartialType } from '@nestjs/mapped-types';
import { CreateLivreurDto } from './create-livreur.dto';

export class UpdateLivreurDto extends PartialType(CreateLivreurDto) {}
