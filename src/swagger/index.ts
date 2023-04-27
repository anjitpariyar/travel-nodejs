import swaggerJSDoc from "swagger-jsdoc";
const path = require("path");
const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API for Swagger Documentation for our Travel APP",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: process.env.API }],
  },
  apis: ["src/routes/authRoutes.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
