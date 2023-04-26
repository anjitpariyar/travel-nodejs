import swaggerJSDoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API for Swagger Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: process.env.API }],
  },
  apis: [`${__dirname}/routes/index.ts`, "./dist/routes/index.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
