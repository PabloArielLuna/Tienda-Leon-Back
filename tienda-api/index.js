import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import notFound from './middlewares/notFound.middleware.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

// 404 para rutas no definidas
app.use(notFound);

// middleware error handler (final)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});