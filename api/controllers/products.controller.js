import * as productService from '../services/products.service.js';

export async function getAllProducts(req, res, next) {
    try {
        const products = await productService.listProducts();
        res.json(products);
    } catch (err) {
        next(err);
    }
}

export async function getProductById(req, res, next) {
    try {
        const id = req.params.id;
        const product = await productService.findProduct(id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        next(err);
    }
}

export async function createProduct(req, res, next) {
    try {
        const body = req.body;
        const created = await productService.addProduct(body);
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const id = req.params.id;
        const deleted = await productService.deleteProduct(id);
        res.json({ message: 'Eliminado', id: deleted.id });
    } catch (err) {
        next(err);
    }
}