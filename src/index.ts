import dotenv from 'dotenv';
import express, {Express} from "express";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;

// middleware 
app.use(express.json());

app.get('/getData', (req, res) => {
    res.send('Hello world!');
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})