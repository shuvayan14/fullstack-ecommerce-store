// server/server.js

// 1. Core Node patch to bypass local ISP connection restrictions
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); 

// 2. Import core dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 3. Import local project modules
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes"); // New Auth Routes

// 4. Load environment variables (.env config)
dotenv.config();

// 5. Initialize the Express application
const app = express();

// 6. Global Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON data in request bodies (req.body)

// 7. Establish database connection with MongoDB Atlas
connectDB();

// 8. Base Health Check Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// 9. API Routing Connections
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); // New Endpoint for registration and login

// 10. Start Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});