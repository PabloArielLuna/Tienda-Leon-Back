import admin from 'firebase-admin';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
if (!serviceAccountPath || !fs.existsSync(path.resolve(__dirname, '..', serviceAccountPath))) {
    console.error('No se encuentra serviceAccountKey.json. Asegurate de setear FIREBASE_SERVICE_ACCOUNT_PATH en .env');
    process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', serviceAccountPath), 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export { admin, db };