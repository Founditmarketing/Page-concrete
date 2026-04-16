import 'dotenv/config';
import express from 'express';
import { contactRouter } from './api/contact.js';

const app = express();
app.use(express.json());

// Mount routes
app.use('/api', contactRouter);

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`[server] API running on http://localhost:${PORT}`);
});
