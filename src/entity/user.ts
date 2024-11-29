import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column({ nullable: false })
    name!: string;


}