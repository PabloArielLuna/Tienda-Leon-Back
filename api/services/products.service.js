const API_BASE = 'https://fakestoreapi.com/products';

let productsCache = null;
let nextLocalId = 100000;

async function fetchFromFakeStore() {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Error al obtener productos remotos');
    const arr = await res.json();
    return arr.map(p => ({ ...p, source: 'remote' }));
}

export async function listProducts() {
    if (!productsCache) {
        const remote = await fetchFromFakeStore();
        productsCache = [...remote];
    }
    return productsCache;
}

export async function findProduct(id) {
    if (!productsCache) await listProducts();
    return productsCache.find(p => String(p.id) === String(id)) || null;
}

export async function addProduct(data) {
    const { title, price, category } = data || {};
    if (!title || price == null || !category) {
        const err = new Error('Faltan campos: title, price, category');
        err.status = 400;
        throw err;
    }
    const newProduct = {
        id: nextLocalId++,
        title,
        price: Number(price),
        category,
        description: data.description || '',
        image: data.image || '',
        source: 'local'
    };
    if (!productsCache) await listProducts();
    productsCache.push(newProduct);
    return newProduct;
}

export async function deleteProduct(id) {
    if (!productsCache) await listProducts();
    const idx = productsCache.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const [removed] = productsCache.splice(idx, 1);
    return removed;
}