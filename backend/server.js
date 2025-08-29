const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static images
app.use("/images", express.static("public/images"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/perfumeShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  sizes: [String],
  images: [String],
  reviews: [{ user: String, comment: String }],
});

const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.post("/api/products/:id/reviews", async (req, res) => {
  const { user, comment } = req.body;
  const product = await Product.findById(req.params.id);
  product.reviews.push({ user, comment });
  await product.save();
  res.json(product);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

// POST review
app.post("/api/products/:id/reviews", async (req, res) => {
  const { user, comment } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    product.reviews.push({ user, comment });
    await product.save();

    res.json(product); // return updated product
  } catch (error) {
    res.status(500).send("Error saving review");
  }
});
