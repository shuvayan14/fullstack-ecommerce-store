import React, { useState } from "react";

function AuthModal({ isOpen, onClose, setLoggedInUser }) {
  if (!isOpen) return null;

  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register views
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/users/login" : "/api/users/register";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Success! Save user data & token to localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoggedInUser(data); // Update global state in App.jsx
      onClose(); // Close modal panel
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{isLogin ? "🔑 Welcome Back" : "📝 Create Account"}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {error && <div className="auth-error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "New to our store? " : "Already have an account? "}
            <button type="button" onClick={() => { setIsLogin(!isLogin); setError(""); }}>
              {isLogin ? "Create an account" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;