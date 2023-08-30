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

```Folder Structure
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
```

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

Define your application's routes and controllers. For example, `routes/hotelRoutes.ts` and `controller/Hotel.ts` handle hotel-related functionality.

## Setting Up Express App

In `src/index.ts`, the Express app is configured. The server listens on the specified port, and middleware for handling requests and responses is set up.

## API Documentation with Swagger

API documentation is generated using Swagger. The `swagger.json` file defines API paths and definitions. Access the documentation at `http://localhost:4001/api-docs`.

## Running the Project

1. Install project dependencies:

   ```bash
   yarn
   ```

2. Run the project

   ```bash
   yarn run dev
   ```

This starts the server with nodemon, providing live-reloading during development.

Feel free to expand upon this foundation by adding more routes, controllers, models, and other functionalities to create a fully featured travel application. Happy coding!

** Author:**

- [Anjit Pariyar ](https://www.anjitpariyar.com.np/)

** Other Team Member **

- [Chanda Sherestha](https://www.instagram.com/cresthachanda/)
- [Anubhav Khadka](https://www.instagram.com/anubhav.kh/)

** Recourse **

- [Swagger Documentation](https://travel-nodejs.vercel.app/api-docs/)
- [More Details and uses of API]()
- [Hotel Admin](https://travel-admin-beta.vercel.app/)
- [Hotel Admin Repo](https://github.com/anjitpariyar/travel-admin)
- [Node Scrapper Repo](https://github.com/anjitpariyar/node-crawler)
- [React Native Repo](https://github.com/chandasherestha/Yatra-Sangraha)
- [React Native APK]()
- [Design Figma ](https://www.figma.com/file/zoGBzrgcctExFiUnpAphww/YATRA-SANGRAHA-%2F-TRAVELING-APP?type=design&node-id=0%3A1&mode=design&t=y9rIbpOOKVXQuQbt-1)
- [Presentation]()
- [College Documentation]()
