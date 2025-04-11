-- Initialisation script de la base de données
DROP TABLE IF EXISTS items; -- On réinitialise la table pour éviter les doublons.

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT
);

-- Insertion de quelques données pour tester (les apostrophes sont échappées)
INSERT INTO items (title, description) VALUES
  ('Recette Spaghetti', 'Spaghetti avec sauce tomate et basilic'),
  ('Citation Inspirante', 'La vie est un mystère qu''il faut vivre, et non un problème à résoudre'),
  ('Anecdote Drôle', 'Une petite anecdote amusante pour égayer la journée');