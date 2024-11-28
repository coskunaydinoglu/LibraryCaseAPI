import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Book {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column({ nullable: false })
    uuid!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({nullable: false, default: true})
    available!: boolean;


    @BeforeInsert()
    generateUuid() {
        this.uuid = uuidv4();
    }
}