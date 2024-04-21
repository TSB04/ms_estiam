import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Livreur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact_info: string;

  @Column()
  vehicle_type: string;

  @Column()
  availability: boolean;
}
