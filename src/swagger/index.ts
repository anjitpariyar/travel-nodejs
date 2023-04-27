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
      { url: "https://travel-nodejs.vercel.app/" },
      { url: "http://localhost:4001/" },
    ],
  },
  apis: [
    path.join(
      __dirname,
      `../routes/authRoutes.${process.env.Env === "production" ? "js" : "ts"}`
    ),
  ],
};
// console.log("__dirname", __dirname);
export const swaggerSpec = swaggerJSDoc(options);
