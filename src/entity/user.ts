import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column({ nullable: false })
    uuid!: string;

    @Column({ nullable: false })
    name!: string;


    @BeforeInsert()
    generateUUID() {
        this.uuid = uuidv4();
    }
}