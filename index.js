import { argv } from 'process';

const API_BASE = 'https://fakestoreapi.com/products';

const [, , methodRaw, resourceRaw, ...rest] = argv;
if (!methodRaw || !resourceRaw) showUsageAndExit();

const method = methodRaw.toUpperCase();
const [resource, maybeId] = resourceRaw.split('/');

(async function main() {
  try {
    if (method === 'GET' && resource === 'products' && !maybeId) {
      await getAllProducts();
    } else if (method === 'GET' && resource === 'products' && maybeId) {
      await getProductById(maybeId);
    } else if (method === 'POST' && resource === 'products') {
      await createProduct(rest);
    } else if (method === 'DELETE' && resource === 'products' && maybeId) {
      await deleteProduct(maybeId);
    } else {
      showUsageAndExit();
    }
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();

function showUsageAndExit() {
  console.log(`
Uso:
  npm run start GET products
  npm run start GET products/<id>
  npm run start POST products <title> <price> <category>
      (Ejemplo: npm run start POST products "T Shirt Rex" 300 remeras)
  npm run start DELETE products/<id>
`);
  process.exit(1);
}

async function getAllProducts() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Error al consultar productos: ' + res.status);
  const products = await res.json();
  console.log('Productos (total:', products.length + ')');
  console.log(JSON.stringify(products, null, 2));
}

async function getProductById(id) {
  if (!/^\d+$/.test(id)) { console.error('El id debe ser numérico'); process.exit(1); }
  const res = await fetch(`${API_BASE}/${id}`);
  if (res.status === 404) {
    console.log(`Producto con id ${id} no encontrado.`);
    return;
  }
  if (!res.ok) throw new Error('Error al consultar producto: ' + res.status);
  const product = await res.json();
  console.log(JSON.stringify(product, null, 2));
}

async function createProduct(argsArray) {
  if (argsArray.length < 3) {
    console.error('Faltan argumentos para POST. Se requieren: <title> <price> <category>');
    process.exit(1);
  }
  const [rawTitle, rawPrice, rawCategory] = argsArray;
  const title = rawTitle.replace(/-/g, ' ');
  const price = Number(rawPrice);
  const category = rawCategory.replace(/-/g, ' ');
  if (Number.isNaN(price)) { console.error('Price debe ser un número válido.'); process.exit(1); }

  const body = {
    title,
    price,
    description: 'Producto creado desde TP Node.js',
    image: 'https://i.pravatar.cc',
    category
  };

  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error('Error al crear producto: ' + res.status);
  const created = await res.json();
  console.log('Producto creado:');
  console.log(JSON.stringify(created, null, 2));
}

async function deleteProduct(id) {
  if (!/^\d+$/.test(id)) { console.error('El id debe ser numérico'); process.exit(1); }
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (res.status === 404) {
    console.log(`Producto con id ${id} no encontrado.`);
    return;
  }
  if (!res.ok) throw new Error('Error al eliminar producto: ' + res.status);
  const result = await res.json();
  console.log('Respuesta de eliminación:');
  console.log(JSON.stringify(result, null, 2));
}