const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: String,
  altText: String
});

// ImageSchema.virtual('thumbnail').get(function() {
//   return this.url.replace('/upload', '/upload/w_150');
// });

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    //* Added Original Price Later
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0
    },
    countInStock: {
      type: Boolean,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: String,
    },
    images: [ImageSchema],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Product", productSchema);
