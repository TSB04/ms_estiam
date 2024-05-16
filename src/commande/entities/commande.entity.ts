import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.username)
  user: User;

  async validateQuantity(availableQuantity: number): Promise<boolean> {
    return this.quantity <= availableQuantity;
  }
}
