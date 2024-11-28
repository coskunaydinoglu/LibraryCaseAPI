import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from  './book.js'
import { User } from './user.js';

@Entity()
export class Borrow {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ManyToOne(() => Book, (book: { id: any; }) => book.id, { nullable: false })
    book!: Book;

    @ManyToOne(() => User, (user: { id: any; }) => user.id, { nullable: false })
    user!: User;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    borrowDate!: Date;

    @Column({ nullable: true })
    returnDate?: Date;

    @Column({ nullable: true })
    score?: number;
}