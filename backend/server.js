import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
​
dotenv.config();
​
const app = express();
​
// Middleware
app.use(cors());
app.use(express.json());
​
// Serve static images
app.use("/images", express.static("public/images"));
​
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));
​
// Routes
app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Perfume Shop API</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f3eee6; color: #1a1714; font-family: Georgia, "Times New Roman", serif; }
      main { width: min(32rem, calc(100% - 3rem)); }
      p, a { font-family: "Segoe UI", sans-serif; line-height: 1.5; }
      a { color: inherit; }
      .label { letter-spacing: 0.22em; text-transform: uppercase; font-size: 12px; }
    </style>
  </head>
  <body>
    <main>
      <p class="label">Perfume Shop</p>
      <h1>API is running</h1>
      <p>This address is the backend, not the shop. The catalog is available at the products route.</p>
      <p><a href="/api/products">/api/products</a></p>
    </main>
  </body>
</html>`);
});
​
app.use("/api/products", productRoutes);
​
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
​