import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Restaurent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  contact_info: string;
}
