import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatDto } from './create-plat.dto';

export class UpdatePlatDto extends PartialType(CreatePlatDto) {}
