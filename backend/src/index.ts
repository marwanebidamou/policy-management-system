import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config/env';
import connectDB from './config/db';
import tagRouter from './routes/tagRoutes';
import authRouter from './routes/authRoutes';
import errorHandler from './middlewares/errorHandler';
import policyRouter from './routes/policyRoutes';

const app: Application = express();

app.use(morgan('dev')); //Logging

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // For parsing JSON requests

//Routes
app.use('/api/auth', authRouter);
app.use('/api/policy', policyRouter);
app.use('/api/tag', tagRouter);

app.get('/', (req, res) => {
    res.send("GET Request Called")
})

// Error middleware 
app.use(errorHandler);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => console.error("An error occuring when attempting to connect to mongodb database"));


