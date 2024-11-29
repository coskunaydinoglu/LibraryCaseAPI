import express from "express";
import { UserService } from "../services/user.js";
import { body, validationResult } from "express-validator";
import { param } from "express-validator";
import { BookService } from "../services/book.js";

const router = express.Router();


// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await new UserService().getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Get user by ID
router.get("/:id", async (req:any, res:any) => {
    try {

        await param("id").notEmpty().withMessage("User ID is required").run(req);
        await param("id").isNumeric().withMessage("User ID must be a number").run(req);

        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() });
        }

        const user = await new UserService().getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Create a new user
router.post(
    "/",
    body("name").notEmpty().withMessage("Name is required"),
    body("name").customSanitizer(value => {
        return value.replace(/<\/?[^>]+(>|$)/g, "");
    }),
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userExists = await new UserService().checkUserExistsWithName(req.body.name);
        if (userExists) {
            return res.status(400).json({ error: "User already exists with the same name" });
        }

        const { name } = req.body;

        try {
            let user = await new UserService().createUser(name);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Failed to create user" });
        }
    }
);

//borrow a book
router.post("/:userId/borrow/:bookId", async (req: any, res: any) => {

    try {
        await param("userId").notEmpty().withMessage("User ID is required").run(req);
        await param("bookId").notEmpty().withMessage("Book ID is required").run(req);
        await param("userId").isNumeric().withMessage("User ID must be a number").run(req);
        await param("bookId").isNumeric().withMessage("Book ID must be a number").run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, bookId } = req.params;

        const userExists = await new UserService().checkUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        const bookExists = await new BookService().checkBookExists(bookId);
        if (!bookExists) {
            return res.status(404).json({ error: "Book not found" });
        }

        const bookAvailable = await new UserService().checkBookAvailability(bookId);
        if (!bookAvailable) {
            return res.status(400).json({ error: "Book is not available" });
        }


        let borrow = await new UserService().borrowBook(userId, bookId);
        res.json(borrow);
    } catch (error) {
        res.status(500).json({ error: "Failed to borrow book" });
    }
});

//return a book
router.post("/:userId/return/:bookId", async (req: any, res: any) => {
    
        try {
            await param("userId").notEmpty().withMessage("User ID is required").run(req);
            await param("bookId").notEmpty().withMessage("Book ID is required").run(req);
            await param("userId").isNumeric().withMessage("User ID must be a number").run(req);
            await param("bookId").isNumeric().withMessage("Book ID must be a number").run(req);
            await body("score").isNumeric().withMessage("Score must be a number").run(req);
    
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { userId, bookId } = req.params;
    
            const userExists = await new UserService().checkUserExists(userId);
            if (!userExists) {
                return res.status(404).json({ error: "User not found" });
            }
    
            const bookExists = await new BookService().checkBookExists(bookId);
            if (!bookExists) {
                return res.status(404).json({ error: "Book not found" });
            }
    
            const bookAvailable = await new UserService().checkBookAvailability(bookId);
            if (bookAvailable) {
                return res.status(400).json({ error: "Book is already available" });
            }
    
            let borrow = await new UserService().returnBook(userId, bookId, req.body.score);
            res.json(borrow);
        } catch (error: any) {
            res.status(500).json({ error: error });
        }
    }
);
export default router;
