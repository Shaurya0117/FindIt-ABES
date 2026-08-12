require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Mock Auth Middleware (for demo purposes)
const mockAuth = async (req, res, next) => {
  // Always attach a default user for hackathon demo
  let user = await prisma.user.findUnique({ where: { email: 'Shaurya.25b15310117@abes.ac.in' } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'Shaurya.25b15310117@abes.ac.in',
        name: 'Shaurya Pratap Singh'
      }
    });
  }
  req.user = user;
  next();
};

app.use(mockAuth);

// --- API ROUTES ---

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single item
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { user: true, claims: { include: { user: true } } }
    });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Report an item
app.post('/api/items', async (req, res) => {
  try {
    const { title, description, category, status, location, imageUrl } = req.body;
    const item = await prisma.item.create({
      data: {
        title,
        description,
        category,
        status,
        location,
        imageUrl: imageUrl || 'https://via.placeholder.com/300',
        userId: req.user.id
      }
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim an item
app.post('/api/claims', async (req, res) => {
  try {
    const { itemId, message } = req.body;
    const claim = await prisma.claim.create({
      data: {
        itemId: parseInt(itemId),
        userId: req.user.id,
        message
      }
    });
    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user dashboard data
app.get('/api/users/dashboard', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        items: true,
        claims: { include: { item: true } }
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Team Vynex Backend running on http://localhost:${PORT}`);
});
