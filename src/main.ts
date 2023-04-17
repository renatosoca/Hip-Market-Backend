import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './database';
import { router } from './routes';

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/', router );

const port = process.env.PORT || 4000;
app.listen( port, () => console.log(`Server running on port ${port}`) );
