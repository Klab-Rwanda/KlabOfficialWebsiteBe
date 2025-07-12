import express from 'express';
import homeRoutes from './routes/home.routes';

const app = express();

app.use(express.json())

// Routes
app.use('/', homeRoutes);

export default app;
