# Travel Project

Welcome to the Travel project! This is a learning project for building a Node.js backend with MongoDB for managing travel-related data. The project structure is designed to help you get started with creating APIs, handling database operations, and more.

## Table of Contents

- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Connection](#database-connection)
- [Creating Routes and Controllers](#creating-routes-and-controllers)
- [Setting Up Express App](#setting-up-express-app)
- [API Documentation with Swagger](#api-documentation-with-swagger)
- [Running the Project](#running-the-project)

## Project Structure

The project follows a structured directory layout:

Travel/
├── src/
│ ├── controller/
│ ├── db/
│ ├── middleware/
│ ├── model/
│ ├── routes/
│ ├── utils/
│ └── index.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

- `src/`: Contains different components of the application.
- `.env`: Environment variable configuration.
- `.gitignore`: Specifies files and directories to be ignored by version control.
- `package.json`: Lists dependencies and project details.
- `tsconfig.json`: TypeScript compiler configuration.

## Environment Variables

Create a `.env` file in the project root and add your environment variables:

```dotenv
mongoDB=mongodb+srv://your-mongodb-uri
mySecret=your-secret-key
API=http://localhost:4001
Env=local
```

## Database Connection

The database connection is established in `db/Dbconnect.ts`. The `connectDb` function uses mongoose to connect to MongoDB.

## Creating Routes and Controllers

Define your application's routes and controllers. For example, `routes/HotelRoutes.ts` and `controller/HotelController.ts` handle hotel-related functionality.

## Setting Up Express App

In `src/index.ts`, the Express app is configured. The server listens on the specified port, and middleware for handling requests and responses is set up.

## API Documentation with Swagger

API documentation is generated using Swagger. The `swagger.json` file defines API paths and definitions. Access the documentation at `http://localhost:4001/api-docs`.

## Running the Project

1. Install project dependencies:

   ```bash
   npm install
   npm run dev
   ```

   This starts the server with nodemon, providing live-reloading during development.

Feel free to expand upon this foundation by adding more routes, controllers, models, and other functionalities to create a fully featured travel application. Happy coding!

Author: Anjit Pariyar

```

You can copy and paste this additional content directly into your README file after the directory structure section. This will provide a comprehensive overview of the project's features and setup instructions.

```
