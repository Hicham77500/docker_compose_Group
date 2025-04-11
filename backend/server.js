const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(express.json());
app.use(cors());

// Création du pool avec la variable d'environnement DB_URI
const pool = new Pool({
  connectionString: process.env.DB_URI,
});

// Route GET /api/items avec connexion DB
app.get('/api/items', async (req, res, next) => {
  try {
    console.log("DB_URI:", process.env.DB_URI); // vérification de la variable
    const result = await pool.query('SELECT * FROM items');
    console.log("Résultat de la requête:", result.rows);
    res.json({ items: result.rows });
  } catch (err) {
    console.error("Erreur lors du GET /api/items:", err);
    next(err);
  }
});

// Route POST /api/items pour insérer un item dans la DB
app.post('/api/items', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      'INSERT INTO items (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json({ item: result.rows[0] });
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
app.listen(PORT, '0.0.0.0', () => console.log(`Serveur démarré sur le port ${PORT}`));
