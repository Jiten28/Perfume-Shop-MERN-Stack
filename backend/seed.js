const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  sizes: [String],
  images: [String], // <-- already supports multiple images
  reviews: [{ user: String, comment: String }],
});

const Product = mongoose.model("Product", productSchema);

mongoose.connect("mongodb://127.0.0.1:27017/perfumeShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("🌱 Seeding database...");

  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "Chanel No. 5",
      description: "A timeless floral-aldehydic fragrance, iconic and elegant.",
      price: 7999,
      sizes: ["50ml", "100ml"],
      images: ["/images/chanel1.png", "/images/chanel2.png"], // 👈 added 2nd image
      reviews: [],
    },
    {
      name: "Dior Sauvage",
      description: "Fresh and spicy fragrance inspired by open landscapes.",
      price: 6999,
      sizes: ["60ml", "100ml"],
      images: ["/images/sauvage1.png", "/images/sauvage2.png"], // 👈 added 2nd image
      reviews: [],
    },
    {
      name: "Gucci Bloom",
      description: "Floral scent capturing the spirit of contemporary women.",
      price: 6499,
      sizes: ["50ml", "75ml"],
      images: ["/images/gucci1.png", "/images/gucci2.png"], 
      reviews: [],
    },
    {
      name: "YSL Black Opium",
      description: "A sensual and addictive fragrance with coffee and vanilla notes.",
      price: 7299,
      sizes: ["50ml", "90ml"],
      images: ["/images/opium1.png", "/images/opium2.png"], 
      reviews: [],
    },
    {
      name: "Versace Eros",
      description: "Fresh, woody, and slightly oriental fragrance for men.",
      price: 6199,
      sizes: ["50ml", "100ml"],
      images: ["/images/eros1.png", "/images/eros2.png"], 
      reviews: [],
    },
    {
      name: "Tom Ford Black Orchid",
      description: "Rich, dark accords with black truffle and black orchid.",
      price: 9999,
      sizes: ["50ml", "100ml"],
      images: ["/images/orchid1.png", "/images/orchid2.png"], 
      reviews: [],
    },
    {
      name: "Prada L'Homme",
      description: "Elegant blend of iris, amber, and neroli.",
      price: 6799,
      sizes: ["50ml", "100ml"],
      images: ["/images/prada1.png", "/images/prada2.png"], 
      reviews: [],
    },
    {
      name: "Armani Code",
      description: "A seductive fragrance with citrus and soft woody notes.",
      price: 7099,
      sizes: ["50ml", "75ml"],
      images: ["/images/code1.png", "/images/code2.png"], 
      reviews: [],
    },
    {
      name: "Calvin Klein Eternity",
      description: "Classic fragrance with fresh citrus and soft florals.",
      price: 5599,
      sizes: ["50ml", "100ml"],
      images: ["/images/eternity1.png", "/images/eternity2.png"], 
      reviews: [],
    },
    {
      name: "Jean Paul Gaultier Le Male",
      description: "Warm oriental fragrance with mint, lavender, and vanilla.",
      price: 7399,
      sizes: ["75ml", "125ml"],
      images: ["/images/leMale1.png", "/images/leMale2.png"], 
      reviews: [],
    },
  ]);

  console.log("✅ Data seeded with 2 images each!");
  mongoose.disconnect();
});
