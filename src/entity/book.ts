import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn('increment')
    id?: number;



    @Column({ nullable: false })
    name!: string;

    @Column({nullable: false, default: true})
    available!: boolean;


}