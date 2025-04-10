import React from 'react';
import ItemList from './components/ItemList';
import './App.css'; // ajout du thème global

function App() {
  return (
    <div className="app-container">
      <h1>Mini Plateforme</h1>
      <ItemList />
    </div>
  );
}

export default App;
