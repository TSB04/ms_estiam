import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // Add more columns as needed

    async validatePassword(password: string): Promise<boolean> {
        return this.password === password;
    }
}
