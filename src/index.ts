import express from "express";
import { config } from "dotenv";
import router from "./routes/";

const app = express();

config({ path: '.env.local' })

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use('/api/v1/', router);

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log("Server is running!")
})
