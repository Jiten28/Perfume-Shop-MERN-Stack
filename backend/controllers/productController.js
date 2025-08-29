import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reviews.push({ name, rating, comment });
    await product.save();

    res.status(201).json(product.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get top rated perfumes
export const getTopRatedProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const sorted = products
      .map((p) => {
        const avg =
          p.reviews.length > 0
            ? p.reviews.reduce((a, r) => a + r.rating, 0) / p.reviews.length
            : 0;
        return { ...p._doc, avgRating: avg };
      })
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 6);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
