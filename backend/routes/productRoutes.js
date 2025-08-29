// POST /api/products/:id/reviews
router.post("/:id/reviews", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, rating, comment } = req.body;
    const newReview = { name, rating: Number(rating), comment };

    product.reviews.push(newReview);
    await product.save();

    res.status(201).json({ message: "Review added", reviews: product.reviews });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
