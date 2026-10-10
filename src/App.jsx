import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="app-container">
      {!showProducts ? (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Donde el verde se encuentra con la serenidad</p>
          <button onClick={() => setShowProducts(true)}>Comenzar</button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
