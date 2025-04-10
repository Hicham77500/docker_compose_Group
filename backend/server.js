const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
// Middleware pour autoriser le CORS
app.use(cors());

// ...existing middlewares et configurations...

// Route GET /api/items avec gestion d'erreur
app.get('/api/items', (req, res, next) => {
  try {
    // ...existing code pour récupérer les items...
    res.json({ items: [] });
  } catch (err) {
    next(err);
  }
});

// Route POST /api/items avec gestion d'erreur
app.post('/api/items', (req, res, next) => {
  try {
    // ...existing code pour créer un item...
    res.status(201).json({ item: req.body });
  } catch (err) {
    next(err);
  }
});

// Middleware de gestion d'erreurs centralisé
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Une erreur est survenue.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
