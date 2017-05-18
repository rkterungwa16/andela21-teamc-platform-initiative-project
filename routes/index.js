import express from 'express';

const router = express.Router();

// Homepage
router.get('/dashboard', (req, res) => {
  const initiatives = [{ Author: 'James', title: 'Python is good for AI', Created: '21-4-2017', Body: 'I really enjoy reading python' }, { Author: 'Peter', title: 'Javascript is the king of the web', Created: '20-4-2016', Body: 'Javascript is really a fun language to play allong with' }];
  // const initiatives = [];
  res.render('dashboard', { initiatives });
});

export default router;
