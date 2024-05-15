import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({nullable: true, unique: true})
    email: string;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({nullable: true, unique: true})
    phone: number;

    @Column({nullable: true})
    address: string;

    async validatePassword(password: string): Promise<boolean> {
        return this.password === password;
    }
}
