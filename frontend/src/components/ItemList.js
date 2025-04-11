import React, { useState, useEffect } from 'react';
import './ItemList.css';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const apiUrl = `http://${window.location.hostname}:3000/api/items`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          setItems(data.items || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Erreur lors du fetch:', err);
          setError('Erreur lors du chargement des items.');
          setLoading(false);
        });
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    const apiUrl = `http://${window.location.hostname}:3000/api/items`;
    
    // Envoi d'une requête POST à l'API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newItem.trim(),
        description: newDescription.trim() || 'Aucune description'
      })
    })
    .then(response => response.json())
    .then(data => {
      // Ajouter le nouvel item retourné par l'API
      setItems([...items, data.item]);
      setNewItem('');
      setNewDescription('');
    })
    .catch(err => {
      console.error('Erreur lors de l\'ajout:', err);
    });
  };

  return (
      <div>
        <form onSubmit={handleAddItem} className="item-form">
          <input
              type="text"
              placeholder="Titre de l'item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
          />
          <input
              type="text"
              placeholder="Description (optionnel)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
          />
          <button type="submit">Ajouter</button>
        </form>

        {loading ? (
            <p className="loading">Chargement...</p>
        ) : error ? (
            <p className="error">{error}</p>
        ) : (
            <ul className="item-list">
              {items.length > 0 ? (
                  items.map((item) => (
                      <li key={item.id} className="item">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </li>
                  ))
              ) : (
                  <li className="no-item">Aucun item disponible</li>
              )}
            </ul>
        )}
      </div>
  );
}

export default ItemList;
