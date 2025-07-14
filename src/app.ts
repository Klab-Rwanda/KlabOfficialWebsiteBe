import express from 'express';
import cors from "cors";
import { dbRoutes, homeRoutes, authRoutes } from './routes';

const app = express();

app.use(cors());
app.use(express.json())

// Routes
app.use('/', homeRoutes);
app.use('/test', dbRoutes);
app.use('/auth', authRoutes);

export default app;