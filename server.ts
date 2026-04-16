import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { contactRouter } from './api/contact.js';

// Load .env.local first, fall back to .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();

// Allow requests from Vite dev server and production origin
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4173',
    /https:\/\/.*\.vercel\.app$/,
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Mount routes
app.use('/api', contactRouter);

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`[server] API running on http://localhost:${PORT}`);
});
