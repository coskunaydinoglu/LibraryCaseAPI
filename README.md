
# Library Case API

This project is a RESTful API designed to manage a library's users, books, and borrowing operations. Built with Node.js, Express, TypeScript, and TypeORM, it utilizes a PostgreSQL database to handle data persistence.

## Features

- **User Management**: Create and list users.
- **Book Management**: Add and list books.
- **Borrowing Operations**: Enable users to borrow and return books.

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18.x recommended).
- **PostgreSQL**: Install and run PostgreSQL.

## Limitations
This is not a production project. Some best practices are not applied as it was not required.
- The routes are no authenticated. Routes can be secured by JWT token validation or api key
- Insecure Direct Object Reference exists. You can try ids of books and users. Best approach is to create UUID and use this UUID in API parameters instead of directly using the ids. If you check previous migrations you will see that UUID is used.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/coskunaydinoglu/LibraryCaseAPI.git
   cd LibraryCaseAPI
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   - Copy the sample environment file:
     ```bash
     cp .env.sample .env
     ```
   - Update the `.env` file with your database connection details and other necessary configurations.

## Database Setup
Project uses postgres as database. You need to install postgresql. Create the database with the values in ..env file
You can set user name, password and database name as you wish. env.sample is provided to guide you.
```bash
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=postgres
TYPEORM_DATABASE=librarycase
```

1. **Generate migrations**:
If you make changes on the entities ,you can create migrations by using the following
   ```bash
   npx typeorm migration:generate ./src/migration/<your_migration_name> -d dist/data-source.js
   ```
2. **Run migrations**:
   ```bash
   npm run migration:run
   ```

## Running the Application

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Start the server**:
   ```bash
   npm start
   ```

The server will start, and you can interact with the API endpoints as defined in the routes complying the postman.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Express Validator**: Validate the API requests
- **TypeScript**: Typed superset of JavaScript.
- **TypeORM**: ORM for TypeScript and JavaScript.
- **PostgreSQL**: Relational database system.



