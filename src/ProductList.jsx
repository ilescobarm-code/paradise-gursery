import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Plantas Purificadoras de Aire",
      plants: [
        { name: "Savia del Diablo", image: "https://via.placeholder.com/150", cost: "$15" },
        { name: "Lengua de Suegra", image: "https://via.placeholder.com/150", cost: "$20" },
        { name: "Lirio de la Paz", image: "https://via.placeholder.com/150", cost: "$18" },
        { name: "Planta de Araña", image: "https://via.placeholder.com/150", cost: "$12" },
        { name: "Helecho de Boston", image: "https://via.placeholder.com/150", cost: "$22" },
        { name: "Ficus Benjamina", image: "https://via.placeholder.com/150", cost: "$25" },
      ]
    },
    {
      category: "Plantas Aromáticas",
      plants: [
        { name: "Lavanda", image: "https://via.placeholder.com/150", cost: "$15" },
        { name: "Jazmín", image: "https://via.placeholder.com/150", cost: "$18" },
        { name: "Romero", image: "https://via.placeholder.com/150", cost: "$10" },
        { name: "Menta", image: "https://via.placeholder.com/150", cost: "$8" },
        { name: "Menta Piperita", image: "https://via.placeholder.com/150", cost: "$9" },
        { name: "Albahaca", image: "https://via.placeholder.com/150", cost: "$7" },
      ]
    },
    {
      category: "Plantas Suculentas",
      plants: [
        { name: "Aloe Vera", image: "https://via.placeholder.com/150", cost: "$14" },
        { name: "Echeveria", image: "https://via.placeholder.com/150", cost: "$10" },
        { name: "Planta de Jade", image: "https://via.placeholder.com/150", cost: "$16" },
        { name: "Cactus Navidad", image: "https://via.placeholder.com/150", cost: "$12" },
        { name: "Haworthia", image: "https://via.placeholder.com/150", cost: "$11" },
        { name: "Cactus Cebra", image: "https://via.placeholder.com/150", cost: "$13" },
      ]
    }
  ];

  const isAdded = (plantName) => cartItems.some(item => item.name === plantName);

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#2e7d32', color: 'white' }}>
        <h1 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h1>
        <div>
          <button onClick={() => setShowCart(false)}>Plantas</button>
          <button onClick={() => setShowCart(true)}>Carrito ({totalQuantity})</button>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      disabled={isAdded(plant.name)} 
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isAdded(plant.name) ? "Añadido al Carrito" : "Agregar al Carrito"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
