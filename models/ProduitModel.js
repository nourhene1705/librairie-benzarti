let mongoose = require("mongoose");

let ProduitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: { // <-- هوني بـ i صغيرة
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  quantite: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("produit", ProduitSchema);