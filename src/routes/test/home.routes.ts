import { Router } from 'express';

const router = Router();

// GET /
router.get('/', (req, res) => {
  res.send('<h2>Hello world from routed home!</h2>');
});

export default router;