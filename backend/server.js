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

// Fonction pour attendre que la DB soit prête
const waitForDb = async (maxAttempts = 10, delay = 5000) => {
  console.log('Tentative de connexion à la base de données...');
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const client = await pool.connect();
      console.log('Connexion à la base de données établie!');
      
      // Vérifier si la table 'items' existe
      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'items'
        );
      `);
      
      if (!tableCheck.rows[0].exists) {
        console.log("La table 'items' n'existe pas, création en cours...");
        // Création de la table
        await client.query(`
          CREATE TABLE IF NOT EXISTS items (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT
          )
        `);
        console.log("Table 'items' créée avec succès!");

        // Insertion de quelques données pour tester
        await client.query(`
          INSERT INTO items (title, description) VALUES
            ('Recette Spaghetti', 'Spaghetti avec sauce tomate et basilic'),
            ('Citation Inspirante', 'La vie est un mystère qu''il faut vivre, et non un problème à résoudre'),
            ('Anecdote Drôle', 'Une petite anecdote amusante pour égayer la journée')
        `);
        console.log("Données insérées dans 'items' avec succès!");
      }
      
      client.release();
      return true;
    } catch (err) {
      console.error(`Erreur de connexion (tentative ${attempts + 1}/${maxAttempts}):`, err.message);
      attempts++;
      if (attempts >= maxAttempts) {
        console.error('Nombre maximal de tentatives atteint. Impossible de se connecter à la base de données.');
        throw err;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Initialiser la connexion à la base de données avant de démarrer le serveur
(async () => {
  try {
    await waitForDb();
    
    // Démarrer le serveur seulement après la connexion à la DB
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => console.log(`Serveur démarré sur le port ${PORT}`));
  } catch (err) {
    console.error('Erreur lors de l\'initialisation:', err);
    process.exit(1);
  }
})();

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
