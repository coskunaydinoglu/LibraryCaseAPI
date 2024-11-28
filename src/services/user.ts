import { User } from "../entity/user.js";
import { AppDataSource } from "../data-source.js";
import { Book } from "../entity/book.js";
import { Borrow } from "../entity/borrow.js";
import { BookStatus } from "../enums/book-status.enum.js";
import { IsNull, LessThan } from "typeorm";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private bookRepository = AppDataSource.getRepository(Book);
    private borrowRepository = AppDataSource.getRepository(Borrow);

    async getAllUsers() {
        return await this.userRepository.find();
    }


    async getUserById(userId: number) {
        // Define a strongly-typed user object
        const userObj = {
            id: 0,
            name: "",
            past: [] as any[], // Explicitly type the arrays
            present: [] as any[],
        };

        // Fetch the user from the repository
        const user = await this.userRepository.findOneBy({ id: userId });

        // If the user doesn't exist, return or throw an error
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        if (user.id !== undefined) {
            userObj.id = user.id;
        } else {
            throw new Error(`User ID is undefined`);
        }
        userObj.name = user.name;

        // Get all borrows for the user
        const borrows = await this.borrowRepository.find({
            where: {
            user: { id: user.id },
            },
            relations: ["user", "book"]
        });

        userObj.past = borrows
            .filter(borrow => borrow.returnDate && borrow.returnDate < new Date())
            .map(borrow => ({
            bookName: borrow.book.name,
            score: borrow.score,
            }));

        userObj.present = borrows
            .filter(borrow => !borrow.returnDate || borrow.returnDate >= new Date())
            .map(borrow => ({
            bookName: borrow.book.name,
            }));



        return userObj;
    }


    async createUser(name: string) {
        const user = new User();
        user.name = name;
        return await this.userRepository.save(user);
    }

    async userExists(userId: number): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ id: userId });
        return !!user;
    }

    async checkBookAvailability(bookId: number) {
        const book = await this.bookRepository.findOneBy({ id: bookId });
        if (!book) {
            return false;
        }

        return book.available;

    }


    async borrowBook(userId: number, bookId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const book = await this.bookRepository.findOneBy({ id: bookId });

        if (!user || !book) {
            throw new Error("User or book not found");
        }

        book.available = false;
        await this.bookRepository.save(book);

        try {

            const borrow = new Borrow();
            borrow.user = user;
            borrow.book = book;

            const borrowed = await this.borrowRepository.save(borrow);
            return borrowed;
        } catch (error) {
            book.available = true;
            await this.bookRepository.save(book);
            throw new Error("Failed to borrow book");
        }




    }

    async returnBook(userId: number, bookId: number, score: number) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const book = await this.bookRepository.findOneBy({ id: bookId });

        if (!user || !book) {
            throw new Error("User or book not found");
        }

        const borrow = await this.borrowRepository.findOneBy({ user: user, book: book, returnDate: IsNull() });

        if (!borrow) {
            throw new Error("Book not borrowed by user");
        }

        try {

            book.available = true;
            await this.bookRepository.save(book);

            borrow.returnDate = new Date();
            borrow.score = score;
            await this.borrowRepository.save(borrow);
            return borrow;

        } catch (error) {
            book.available = false;
            await this.bookRepository.save(book);
            throw new Error("Failed to return book");
        }

    }
}