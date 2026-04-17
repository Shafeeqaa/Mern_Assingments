import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const products = [
    { id: 1, name: "Sneakers", price: 1999 },
    { id: 2, name: "Backpack", price: 999 },
    { id: 3, name: "Watch", price: 2499 }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  return (
    <div className="App">
      <h1>🛒 Smart Cart</h1>
      <h2>Cart Count: {cart.length}</h2>

      {products.map((item) => (
        <div key={item.id} className="card">
          <p>{item.name} - ₹{item.price}</p>
          <button className="button" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;