import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

// Connect to the database and start the server
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });

export default app;
