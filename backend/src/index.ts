import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config/env';
import connectDB from './config/db';
import tagRouter from './routes/tagRoutes';

const app: Application = express();

app.use(morgan('dev')); //Logging

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // For parsing JSON requests

//Routes
app.use('/api/tag', tagRouter);

app.get('/', (req, res) => {
    res.send("GET Request Called")
})


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => console.error("An error occuring when attempting to connect to mongodb database"));


