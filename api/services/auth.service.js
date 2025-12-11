import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export async function authenticate(email, password) {
    const adminEmail = process.env.ADMIN_USER_EMAIL || 'admin@tienda.com';
    const adminPass = process.env.ADMIN_USER_PASSWORD || 'AdminPass123';

    if (email === adminEmail && password === adminPass) {
        const payload = { email, role: 'admin' };
        const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
        return { token, payload };
    } else {
        const err = new Error('Credenciales inválidas');
        err.status = 401;
        throw err;
    }
}