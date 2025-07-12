import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
});