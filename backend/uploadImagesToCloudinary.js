// uploadImagesToCloudinary.js
require("dotenv").config();
console.log("Using Mongo URI:", process.env.MONGO_URI);

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cloudinary = require("./cloudinary");
require("dotenv").config();

// 1. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

//check db cloudinary updated urls
mongoose.connection.once("open", async () => {
  console.log("Using DB:", mongoose.connection.name);

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log(
    "Collections:",
    collections.map((c) => c.name)
  );
});

// 2. Define Product Schema (non-strict for flexibility)
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model("Product", productSchema, "products"); // use your actual collection name if different

// 3. Upload and update function
async function uploadAndUpdateImages() {
  try {
    const products = await Product.find();

    for (const product of products) {
      if (!product.image || !product.image.includes("localhost")) continue;

      // Extract just the filename from the stored image path
      const fileName = path.basename(product.image);
      const localImagePath = path.join(__dirname, "upload", "images", fileName);

      if (fs.existsSync(localImagePath)) {
        console.log("📤 Uploading:", localImagePath);

        //upload images to Cloudinary successfully
        const result = await cloudinary.uploader.upload(localImagePath, {
          folder: "products",
        });

        // Update product image URL in DB
        product.image = result.secure_url;
        await product.save();
        console.log("✅ Updated DB with Cloudinary URL:", result.secure_url);
      } else {
        console.warn("⚠️ Image not found locally:", localImagePath);
      }
    }

    console.log("🎉 All images processed.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error during upload/update:", err);
    mongoose.disconnect();
  }
}

uploadAndUpdateImages();
