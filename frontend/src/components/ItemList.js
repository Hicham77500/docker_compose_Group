import React, { useState, useEffect } from 'react';
import './ItemList.css';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/items')
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
    // Ici, vous pouvez également envoyer une requête POST à votre API
    setItems([...items, newItem.trim()]);
    setNewItem('');
  };

  return (
      <div>
        <form onSubmit={handleAddItem} className="item-form">
          <input
              type="text"
              placeholder="Ajouter un item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
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
                  items.map((item, index) => (
                      <li key={index} className="item">{item}</li>
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
