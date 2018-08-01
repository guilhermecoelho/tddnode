import express from 'express';
import productsRoute from './products';

const router = express.Router();

router.get('/', (req, res) => res.send('hello'));
router.use('/products', productsRoute);

export default router;
