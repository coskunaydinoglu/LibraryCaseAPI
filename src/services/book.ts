import { Book } from "../entity/book.js";
import { AppDataSource } from "../data-source.js";

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);

    async getAllBooks() {
        return await this.bookRepository.find({ select: ["id", "name"] });
    }

    async createBook(name: string) {
        const book = new Book();
        book.name = name;
        return await this.bookRepository.save(book);
    }

    async checkBookExists(bookId: number): Promise<boolean> {
        const book = await this.bookRepository.findOneBy({ id : bookId });
        return book !== null;
    }

    async checkBookExistsWithName(name: string): Promise<boolean> {
        const book = await this.bookRepository
            .createQueryBuilder("book")
            .where("LOWER(book.name) = LOWER(:name)", { name })
            .select(["book.id"])
            .getOne();
        return !!book;
    }
}