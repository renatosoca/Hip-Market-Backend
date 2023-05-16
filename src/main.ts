import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import Cookie from 'cookie-parser';
import { connectDB } from './database';
import { router } from './routes';

const app = express();
connectDB();

app.use(cors());
app.use(Cookie());
app.use(express.json());
app.use(express.static('storage'));

app.use('/api/', router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
