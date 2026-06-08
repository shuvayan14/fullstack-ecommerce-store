const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "A product must have a category"],
    },
    image: {
      type: String, // We will store the image URL string here
      required: [true, "A product must have an image URL"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;