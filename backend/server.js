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
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));
​
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));
​
app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Perfume Shop API</title>
</head>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#f3eee6;color:#1a1714;font-family:Georgia,serif">
<main style="width:min(32rem,calc(100% - 3rem));font-family:Segoe UI,sans-serif">
<p style="letter-spacing:.22em;text-transform:uppercase;font-size:12px">Perfume Shop</p>
<h1>API is running</h1>
<p>This address is the backend, not the shop. The catalog is at the products route.</p>
<p><a href="/api/products">/api/products</a></p>
</main>
</body>
</html>`);
});
​
app.use("/api/products", productRoutes);
​
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});