import express from 'express';
import dotenv from 'dotenv';
import appealsRoutes from './routes/appealsRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/appeals', appealsRoutes);

export default app;