import express from "express"; //Importing the express
import http from "http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
require("dotenv").config(); //The dotenv for env usage
// comp
import connectDb from "./db/Dbconnect";
import routes from "./routes";
// import { swaggerSpec } from "./swagger";
const swaggerDocument = require("./swagger.json");
const swaggeroptions = {
  customCssUrl: "./swagger/swagger-ui.css",
};
declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}

/**
 * The app instance
 */
let app = express();

//Validating json usage
app.use(express.json());

//Disabling cors
app.use(cors());
/**
 * Creating an http server
 */
let server = http.createServer(app);
// connecting to swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggeroptions)
);
/**
 * Making port for the app
 */
let PORT = process.env.PORT || 4001;

/**
 * Routes
 */
app.use("/", routes);

/**
 * Connecting to mongo DB
 */
connectDb();

/**
 * Making the app listen
 */
server.listen(PORT, () => {
  console.log("---- App Running on PORT `", PORT, "` -----");
});
