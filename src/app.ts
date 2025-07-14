import express from 'express';
import { dbRoutes, homeRoutes } from './routes';

const app = express();

app.use(express.json())

// Routes
app.use('/', homeRoutes);
app.use('/', dbRoutes);

export default app;