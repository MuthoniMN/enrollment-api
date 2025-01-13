import express from "express";
import { config } from "dotenv";
import router from "./routes/";
import cors from "cors";
import path from 'path';

const app = express();

config({ path: '.env.local' })

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/v1/', router);
router.use('/', (req, res) => {
  res.send('Hey, the enrollment API is running')
});

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log("Server is running!")
})
