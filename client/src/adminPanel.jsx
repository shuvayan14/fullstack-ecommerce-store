// client/src/AdminPanel.jsx
import React, { useState } from "react";

function AdminPanel({ loggedInUser }) {
  // If the user isn't logged in, or they aren't marked as an admin, don't show anything
  if (!loggedInUser || !loggedInUser.isAdmin) return null;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [countInStock, setCountInStock] = useState("");

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${loggedInUser.token}`, // Passes your secure login token passport
        },
        body: JSON.stringify({ 
          name, 
          description, 
          price: Number(price), 
          category, 
          image, 
          countInStock: Number(countInStock) 
        }),
      });

      if (response.ok) {
        alert("🎉 Inventory updated and new product registered!");
        // Clear out the form inputs
        setName(""); setPrice(""); setDescription(""); setImage(""); setCountInStock("");
        window.location.reload(); // Instantly refresh the page grid to show the new item
      } else {
        const data = await response.json();
        alert(`Creation failure: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="admin-panel-box" style={{ background: "#f1f5f9", padding: "2rem", borderRadius: "12px", marginTop: "3rem", border: "2px dashed #cbd5e1" }}>
      <h2>🛠️ Admin Inventory Control Hub</h2>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "-0.5rem", marginBottom: "1.5rem" }}>
        This dashboard is only visible to authorized administrative accounts.
      </p>
      
      <form onSubmit={handleCreateProduct} style={{ display: "grid", gap: "1rem" }}>
        <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        <input type="number" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} required style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        <textarea placeholder="Product Description" value={description} onChange={e => setDescription(e.target.value)} required style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", minHeight: "100px" }} />
        <input type="text" placeholder="Image URL (e.g. https://images.unsplash.com/...)" value={image} onChange={e => setImage(e.target.value)} required style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        <input type="number" placeholder="Stock Inventory Count" value={countInStock} onChange={e => setCountInStock(e.target.value)} required style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", background: "white" }}>
          <option value="Electronics">Electronics</option>
          <option value="Wearables">Wearables</option>
          <option value="Accessories">Accessories</option>
        </select>
        
        <button type="submit" style={{ background: "#10b981", color: "white", padding: "1rem", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
          Incorporate New Entry Item
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;