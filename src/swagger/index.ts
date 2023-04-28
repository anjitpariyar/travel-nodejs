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
    servers: [
      {
        url: "https://travel-nodejs.vercel.app/",
        description: "Production",
      },
      {
        url: "http://localhost:4001/",
        description: "Development",
      },
    ],
  },
  apis: [
    path.join(
      __dirname,
      `../routes/*${process.env.Env === "production" ? "js" : "ts"}`
    ),
  ],
  customCssUrl: "swagger-ui.css",
};

export const swaggerSpec = swaggerJSDoc(options, {
  customCssUrl: "swagger-ui.css",
});
