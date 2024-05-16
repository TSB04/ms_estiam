import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


    @Column({ unique: true })
    username: string;

  @Column()
  password: string;

    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    phone: number;

    @Column()
    address: string;

  async validatePassword(password: string): Promise<boolean> {
    return this.password === password;
  }
}
