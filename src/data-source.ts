import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST || "localhost",
    port: Number(process.env.TYPEORM_PORT) || 5432,
    username: process.env.TYPEORM_USERNAME || "postgres",
    password: process.env.TYPEORM_PASSWORD || "postgres",
    database: process.env.TYPEORM_DATABASE || "librarycase",
    synchronize: false, // Migrations are used instead
    logging: true,
    entities: ["dist/entity/**/*.js"], // Use compiled `.js` files
    migrations: ["dist/migration/**/*.js"], // Use compiled `.js` files
    subscribers: ["dist/subscriber/**/*.js"], // Use compiled `.js` files
});
