// server/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Import the security middleware we created in Step A
const { protectAdmin } = require("../middleware/authMiddleware");

// @desc    Fetch all products with optional search and category filters
// @route   GET /api/products
router.get("/", async (req, res) => {
  try {
    const queryObj = {};

    // 1. Handle Text Search Keyword matching (Case-Insensitive)
    if (req.query.keyword) {
      queryObj.name = {
        $regex: req.query.keyword,
        $options: "i", // Ignore upper/lowercase differences
      };
    }

    // 2. Handle Category filtering
    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    // Find products matching our dynamically built query adjustments
    const products = await Product.find(queryObj);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch products" });
  }
});

// @desc    Fetch a single product by its database ID
// @route   GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error: Invalid ID format" });
  }
});

// @desc    Create a new product in the store database inventory array (STEP B)
// @route   POST /api/products
// @access  Private/Admin (Uses protectAdmin middleware to check permissions)
router.post("/", protectAdmin, async (req, res) => {
  try {
    const { name, description, price, category, image, countInStock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      countInStock,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: "Invalid product parameters submitted" });
  }
});

module.exports = router;