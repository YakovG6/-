import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { initDb, db } from './db.js';

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'thelmebel_secret_change_me';

app.use(cors());
app.use(express.json());

const createToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/api/status', async (_req, res) => {
  await initDb();
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/auth/login', async (req, res) => {
  await initDb();
  const { username, password } = req.body || {};
  const admin = db.data.admin;
  if (!username || !password || username !== admin.username) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const match = bcrypt.compareSync(password, admin.passwordHash);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = createToken({ role: 'admin', username });
  return res.json({ token, username });
});

app.get('/api/products', async (_req, res) => {
  await initDb();
  res.json(db.data.products);
});

app.post('/api/products', authMiddleware, async (req, res) => {
  await initDb();
  const product = { ...req.body, id: req.body?.id || `prod-${Date.now()}` };
  db.data.products.unshift(product);
  await db.write();
  res.status(201).json(product);
});

app.put('/api/products/:id', authMiddleware, async (req, res) => {
  await initDb();
  const { id } = req.params;
  const index = db.data.products.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  db.data.products[index] = { ...db.data.products[index], ...req.body };
  await db.write();
  res.json(db.data.products[index]);
});

app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  await initDb();
  const { id } = req.params;
  db.data.products = db.data.products.filter((item) => item.id !== id);
  await db.write();
  res.status(204).send();
});

app.get('/api/categories', async (_req, res) => {
  await initDb();
  res.json(db.data.categories);
});

app.put('/api/categories/:id', authMiddleware, async (req, res) => {
  await initDb();
  const { id } = req.params;
  const index = db.data.categories.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  db.data.categories[index] = { ...db.data.categories[index], ...req.body };
  await db.write();
  res.json(db.data.categories[index]);
});

app.get('/api/materials', async (_req, res) => {
  await initDb();
  res.json(db.data.materials);
});

app.get('/api/leads', authMiddleware, async (_req, res) => {
  await initDb();
  res.json(db.data.leads);
});

app.post('/api/leads', async (req, res) => {
  await initDb();
  const { botField, ...lead } = req.body || {};
  if (botField) return res.status(400).json({ error: 'Bot detected' });
  const newLead = { ...lead, id: `lead-${Date.now()}`, date: new Date().toISOString() };
  db.data.leads.unshift(newLead);
  await db.write();
  res.status(201).json(newLead);
});

app.delete('/api/leads/:id', authMiddleware, async (req, res) => {
  await initDb();
  const { id } = req.params;
  db.data.leads = db.data.leads.filter((lead) => lead.id !== id);
  await db.write();
  res.status(204).send();
});

app.get('/api/chats', authMiddleware, async (_req, res) => {
  await initDb();
  res.json(db.data.chats);
});

app.post('/api/chats/:id/messages', async (req, res) => {
  await initDb();
  const { id } = req.params;
  const { text, role, userName } = req.body || {};
  if (!text || !role) return res.status(400).json({ error: 'Missing message' });
  if (role === 'admin') {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      jwt.verify(authHeader.slice(7), JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }
  const message = {
    id: `msg-${Date.now()}`,
    role,
    text,
    timestamp: new Date().toISOString()
  };
  const session = db.data.chats.find((chat) => chat.id === id);
  if (session) {
    session.messages.push(message);
    session.lastMessage = text;
    session.isRead = role === 'admin';
  } else {
    db.data.chats.unshift({
      id,
      userName: userName || `Клиент ${id.slice(-4)}`,
      lastMessage: text,
      messages: [message],
      isRead: role === 'admin'
    });
  }
  await db.write();
  res.status(201).json(message);
});

app.put('/api/chats/:id/read', authMiddleware, async (req, res) => {
  await initDb();
  const { id } = req.params;
  const session = db.data.chats.find((chat) => chat.id === id);
  if (!session) return res.status(404).json({ error: 'Not found' });
  session.isRead = true;
  await db.write();
  res.json(session);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
