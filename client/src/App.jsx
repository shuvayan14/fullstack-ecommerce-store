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

  // Fetch products with a slight debounce delay on keyword/category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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
    
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, category]);

  // Handle Stripe redirect feedback parameters
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
        {/* Row 1: Logo & Authentication Actions */}
        <div className="header-top-bar">
          <div className="brand-logo-container">
            <span className="brand-logo">Apex</span>
          </div>
          
          <div className="header-actions-group">
            {loggedInUser ? (
              <div className="user-profile-menu">
                <span>Hi, <strong>Account & Lists</strong></span>
                <button className="logout-btn" onClick={() => { localStorage.removeItem("userInfo"); setLoggedInUser(null); }}>Logout</button>
              </div>
            ) : (
              <button className="login-btn" onClick={() => setIsAuthOpen(true)}>
                Hi, <strong>Account & Lists</strong>
              </button>
            )}

            <button className="view-cart-btn" onClick={() => setIsCartOpen(true)}>
              <span>🛒 <strong>View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</strong></span>
            </button>
          </div>
        </div>

        {/* Row 2: Optimized centered Search layout */}
        <div className="search-filter-wrapper">
          <div className="search-bar-inner">
            <input 
              type="text" 
              placeholder="Search Apex.in" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="enhanced-search-input"
            />
          </div>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="enhanced-category-select"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Wearables">Wearables</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </header>

      {/* Main Catalog View Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Updating catalog...</div>
        </div>
      ) : error ? (
        <div className="loading-container">
          <div className="loading-text" style={{ color: "#ef4444" }}>Error: {error}</div>
        </div>
      ) : (
        <main className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="image-container">
                <img src={product.image} alt={product.name} />
              </div>
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

      {/* Centered Premium Footer Section */}
      <footer className="store-footer">
        <div className="footer-content">
          <span className="footer-logo">Apex</span>
          <p>© {new Date().getFullYear()} All rights Reserved</p>
        </div>
      </footer>

      {/* Slide-out Sidebar & Authentication Modals */}
      <Cart 
        cartItems={cartItems} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        removeFromCart={(id) => setCartItems(cartItems.filter(i => i._id !== id))} 
        updateQuantity={(id, q) => setCartItems(cartItems.map(i => i._id === id ? {...i, quantity: q} : i))} 
      />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        setLoggedInUser={setLoggedInUser} 
      />
    </div>
  );
}

export default App;