import React, { useState, useEffect } from "react";

export default function ProductCartApp() {

  // Product List
  const products = [
    { id: 1, name: "Sneakers", price: 1999 },
    { id: 2, name: "Backpack", price: 999 },
    { id: 3, name: "Watch", price: 2499 }
  ];

  // Cart State
  const [cart, setCart] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // useEffect to log cart updates
  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🛒 Smart Cart</h1>

      {/* Cart Count */}
      <div style={styles.cartBox}>
        Cart Items: {cart.length}
      </div>

      {/* Product List */}
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>

            <button
              style={styles.button}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline Styles (clean + unique UI)
const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    padding: "20px",
    background: "linear-gradient(to right, #ffecd2, #fcb69f)",
    minHeight: "100vh"
  },
  heading: {
    marginBottom: "20px"
  },
  cartBox: {
    background: "#333",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    display: "inline-block",
    marginBottom: "20px"
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "200px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    border: "none",
    background: "#ff7e5f",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  }
};