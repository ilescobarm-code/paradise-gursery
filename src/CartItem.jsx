import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costStr) => parseFloat(costStr.replace('$', '')) || 0;

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total del Carrito: ${calculateTotalAmount()}</h2>
      {cartItems.map((item, index) => (
        <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>Precio unitario: {item.cost}</p>
          <div>
            <button onClick={() => handleDecrement(item)}>-</button>
            <span style={{ margin: '0 10px' }}>{item.quantity}</span>
            <button onClick={() => handleIncrement(item)}>+</button>
          </div>
          <p>Subtotal: ${(parseCost(item.cost) * item.quantity).toFixed(2)}</p>
          <button onClick={() => dispatch(removeItem(item.name))}>Eliminar</button>
        </div>
      ))}
      <div style={{ marginTop: '20px' }}>
        <button onClick={onContinueShopping}>Continuar Comprando</button>
        <button onClick={() => alert('Próximamente')} style={{ marginLeft: '10px' }}>Pagar</button>
      </div>
    </div>
  );
}

export default CartItem;
