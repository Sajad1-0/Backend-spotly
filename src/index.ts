import dotenv from 'dotenv';
import express, {Express} from "express";
import userRouter from './routes/user-routes'
import roomRouter from './routes/rooms-router'
import bookingRouter from './routes/booking-routes'
 
dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;

// middleware 
app.use(express.json());
app.use('/users', userRouter)
app.use('/rooms', roomRouter)
app.use('/bookings', bookingRouter)

app.get('/getData', (req, res) => {
    res.send('Hello world!');
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})