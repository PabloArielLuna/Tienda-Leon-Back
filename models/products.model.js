import { db } from '../config/firebase.js';

const COLLECTION = 'products';

export async function getAll() {
    const snapshot = await db.collection(COLLECTION).get();
    const products = [];
    snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
    return products;
}

export async function getById(id) {
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
}

export async function create(product) {
    const docRef = await db.collection(COLLECTION).add(product);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
}

export async function remove(id) {
    const docRef = db.collection(COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    await docRef.delete();
    return { id };
}