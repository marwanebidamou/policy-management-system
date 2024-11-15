import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app: Application = express();

app.use(morgan('dev')); //Logging

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // For parsing JSON requests


app.get('/', (req, res) => {
    res.send("GET Request Called")
})


app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
