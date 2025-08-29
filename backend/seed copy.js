import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected for Seeding");

    await Product.deleteMany();

    await Product.insertMany([
      {
        name: "Chanel No. 5",
        description: "A timeless floral-aldehydic fragrance, iconic and elegant.",
        price: 16750,
        sizes: ["50ml", "100ml"],
        images: ["/images/chanel1.png", "/images/chanel2.png"],
        reviews: [],
      },
      {
        name: "Dior Sauvage",
        description: "Fresh and spicy fragrance inspired by open landscapes.",
        price: 12599,
        sizes: ["60ml", "100ml"],
        images: ["/images/sauvage1.png", "/images/sauvage2.png"],
        reviews: [],
      },
      {
        name: "Gucci Bloom",
        description: "Floral scent capturing the spirit of contemporary women.",
        price: 12100,
        sizes: ["50ml", "75ml"],
        images: ["/images/gucci1.png", "/images/gucci2.png"],
        reviews: [],
      },
      {
        name: "YSL Black Opium",
        description: "A sensual and addictive fragrance with coffee and vanilla notes.",
        price: 9999,
        sizes: ["50ml", "90ml"],
        images: ["/images/opium1.png", "/images/opium2.png"],
        reviews: [],
      },
      {
        name: "Versace Eros",
        description: "Fresh, woody, and slightly oriental fragrance for men.",
        price: 9699,
        sizes: ["50ml", "100ml"],
        images: ["/images/eros1.png", "/images/eros2.png"],
        reviews: [],
      },
      {
        name: "Tom Ford Black Orchid",
        description: "Rich, dark accords with black truffle and black orchid.",
        price: 17999,
        sizes: ["50ml", "100ml"],
        images: ["/images/orchid1.png", "/images/orchid2.png"],
        reviews: [],
      },
      {
        name: "Prada L'Homme",
        description: "Elegant blend of iris, amber, and neroli.",
        price: 10599,
        sizes: ["50ml", "100ml"],
        images: ["/images/prada1.png", "/images/prada2.png"],
        reviews: [],
      },
      {
        name: "Armani Code",
        description: "A seductive fragrance with citrus and soft woody notes.",
        price: 8299,
        sizes: ["50ml", "75ml"],
        images: ["/images/code1.png", "/images/code2.png"],
        reviews: [],
      },
      {
        name: "Calvin Klein Eternity",
        description: "Classic fragrance with fresh citrus and soft florals.",
        price: 6399,
        sizes: ["50ml", "100ml"],
        images: ["/images/eternity1.png", "/images/eternity2.png"],
        reviews: [],
      },
      {
        name: "Jean Paul Gaultier Le Male",
        description: "Warm oriental fragrance with mint, lavender, and vanilla.",
        price: 11999,
        sizes: ["75ml", "125ml"],
        images: ["/images/leMale1.png", "/images/leMale2.png"],
        reviews: [],
      },
    ]);

    console.log("🌱 Data seeded with 2 images each!");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding Error:", error.message);
    process.exit(1);
  }
};

seedProducts();
