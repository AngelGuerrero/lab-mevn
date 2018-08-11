import careers from '../data/careers.json';
import express from 'express';

const router = express.Router();

// api/v1/careers.json
router.get('/careers', (req, res) => res.json(careers));

module.exports = router;
