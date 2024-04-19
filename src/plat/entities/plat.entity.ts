import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;
}
