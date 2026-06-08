import React from "react";

function Cart({ cartItems, isOpen, onClose, removeFromCart, updateQuantity }) {
  if (!isOpen) return null;

  // Calculate total price of everything in the cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>🛒 Your Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is feeling lonely. Add some products!</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
                  
                  <div className="qty-selector">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      disabled={item.quantity >= item.countInStock}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => removeFromCart(item._id)}>
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Total Amount:</span>
              <span className="total-price">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;