// server/seeder.js

// 1. Force Google DNS to bypass ISP restrictions
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); 

// 2. Required packages and modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sampleProducts = require("./data/products");
const Product = require("./models/Product");
const connectDB = require("./config/db");

// 3. Load environment variables
dotenv.config();

// 4. Connect to MongoDB Atlas
connectDB();

const importData = async () => {
  try {
    // Clear any existing data to avoid duplicates
    await Product.deleteMany();

    // Insert our sample products array
    await Product.insertMany(sampleProducts);

    console.log("🎉 Data Successfully Imported into MongoDB Atlas!");
    process.exit(); 
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1); 
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("🗑️ All Database Products Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Execution logic
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}