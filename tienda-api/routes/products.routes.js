import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

// rutas públicas si querés: GET todos y GET por id (podés protegerlos si preferís)
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

// rutas protegidas (crear, eliminar)
router.post('/create', authMiddleware, productsController.createProduct);
router.delete('/:id', authMiddleware, productsController.deleteProduct);

export default router;