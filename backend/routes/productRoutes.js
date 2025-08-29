import express from "express";
import {
  getProducts,
  getProductById,
  addReview,
  getTopRatedProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/top", getTopRatedProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", addReview);

export default router;
