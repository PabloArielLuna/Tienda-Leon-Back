const API_BASE = 'https://dummyjson.com/products';

let productsCache = null;
let nextLocalId = 100000;

// Obtener productos del API DummyJSON
async function fetchFromDummy() {
    const res = await fetch(API_BASE);

    if (!res.ok) {
        throw new Error('Error al obtener productos remotos');
    }

    const data = await res.json();

    // DummyJSON devuelve { products: [...] }
    return data.products.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        description: p.description,
        image: p.thumbnail,
        source: 'remote'
    }));
}

export async function listProducts() {
    if (!productsCache) {
        const remote = await fetchFromDummy();
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