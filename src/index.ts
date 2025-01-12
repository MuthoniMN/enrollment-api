import express from "express";
import { config } from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();

config({ path: '.env.local' })

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log("Server is running!")
})
