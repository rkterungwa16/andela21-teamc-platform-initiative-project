import express from 'express';

const router = express.Router();

// Register
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});




export default router;
