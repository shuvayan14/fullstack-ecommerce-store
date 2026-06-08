// client/src/App.jsx
import { useState, useEffect } from "react";
import Cart from "./Cart";
import AuthModal from "./AuthModal";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  // Search and Filter States
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("userInfo");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Hook listening to changes in Keyword or Category selections
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Build dynamic query parameters
        let url = `http://localhost:5000/api/products?keyword=${keyword}`;
        if (category) {
          url += `&category=${category}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    // Simple debounce to avoid spamming database on every single keystroke
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, category]);

  // Handle stripe feedback parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("success")) {
      alert("🎉 Payment Successful! Thank you for your order.");
      setCartItems([]);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...exist, quantity: exist.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="app-container">
      <header className="store-header">
        <div className="header-top-bar">
          {loggedInUser ? (
            <div className="user-profile-menu">
              <span>👋 Hi, <strong>{loggedInUser.name}</strong> {loggedInUser.isAdmin && <mark className="admin-badge">Admin</mark>}</span>
              <button className="logout-btn" onClick={() => { localStorage.removeItem("userInfo"); setLoggedInUser(null); }}>Logout</button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setIsAuthOpen(true)}>🔑 Login / Sign Up</button>
          )}
        </div>

        <h1>🚀 My E-Commerce Store</h1>
        
        {/* Search and Filters Layout Section */}
        <div className="filter-controls">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Wearables">Wearables</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <button className="view-cart-btn" onClick={() => setIsCartOpen(true)}>
          🛒 View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
      </header>

      {loading ? (
        <div className="loading">Updating catalog...</div>
      ) : (
        <main className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="image-container"><img src={product.image} alt={product.name} /></div>
              <div className="product-info">
                <span className="category-tag">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="card-footer">
                  <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.countInStock > 0 ? (
                    <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                  ) : (
                    <button className="out-btn" disabled>Out of Stock</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </main>
      )}

      <Cart cartItems={cartItems} isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} removeFromCart={(id) => setCartItems(cartItems.filter(i => i._id !== id))} updateQuantity={(id, q) => setCartItems(cartItems.map(i => i._id === id ? {...i, quantity: q} : i))} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} setLoggedInUser={setLoggedInUser} />
    </div>
  );
}

export default App;