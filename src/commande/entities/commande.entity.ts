import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurant_id: number;

  @Column()
  plat_id: number;

  @Column()
  quantity: number;

  @Column({ type: 'date' })
  date: Date;

  async validateQuantity(availableQuantity: number): Promise<boolean> {
    return this.quantity <= availableQuantity;
  }
}
