// server/data/products.js

const sampleProducts = [
  {
    name: "Minimalist Wireless Headphones",
    description: "High-quality sound with active noise cancellation and a sleek, matte finish. Up to 40 hours of battery life.",
    price: 8999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    countInStock: 12,
  },
  {
    name: "Ergonomic Mechanical Keyboard",
    description: "Tactile mechanical switches, customizable RGB backlighting, and a comfortable aluminum wrist rest.",
    price: 6499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    countInStock: 7,
  },
  {
    name: "Stainless Steel Smart Watch",
    description: "Track your fitness, heart rate, and sleep metrics. Features an always-on AMOLED display and water resistance.",
    price: 12499,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    countInStock: 20,
  },
  {
    name: "Waterproof Travel Backpack",
    description: "Spacious multi-compartment design with a dedicated 15.6-inch laptop sleeve and hidden anti-theft pockets.",
    price: 3499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
    countInStock: 0, // Out of stock to test our frontend badges later!
  }
];

module.exports = sampleProducts;