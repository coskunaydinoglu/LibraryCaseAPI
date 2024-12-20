import express from "express";
import { Book } from "../entity/book.js";
import { AppDataSource } from "../data-source.js";
import { BookService } from "../services/book.js";
import { body, validationResult } from "express-validator";

const router = express.Router();
const bookRepository = AppDataSource.getRepository(Book);

// Get all books
router.get("/", async (req, res) => {
    try {
        const books = await new BookService().getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

// Create a new book
router.post("/",
    body("name").notEmpty().withMessage("Name is required"),
    body("name").customSanitizer(value => {
        return value.replace(/<\/?[^>]+(>|$)/g, "");
    }),
    async (req:any, res:any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const bookExists = await new BookService().checkBookExistsWithName(req.body.name);
        if (bookExists) {
            return res.status(400).json({ error: "Book already exists with the same name" });
        }

        const { name } = req.body;

        try {
            let book = await new BookService().createBook(name);
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ error: "Failed to create book" });
        }
    });

export default router;
