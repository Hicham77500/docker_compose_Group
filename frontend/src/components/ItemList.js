import React, { useState, useEffect } from 'react';
import './ItemList.css'; // ajout du thème pour la liste

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/items')
      .then(response => response.json())
      .then(data => {
        // Adaptation selon le format renvoyé par l'API (exemple pour { items: [...] })
        setItems(data.items || []);
      })
      .catch(err => console.error('Erreur lors du fetch:', err));
  }, []);

  return (
    <ul className="item-list">
      {items.length ? (
        items.map((item, index) => <li key={index} className="item">{item}</li>)
      ) : (
        <li className="no-item">Aucun item disponible</li>
      )}
    </ul>
  );
}

export default ItemList;
