const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/user');
const Cart = require('../models/Cart');
const products = require('../data/products');
const Category = require('../models/Category');

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

const categories = [
    { name: "Electronics", image: "https://picsum.photos/500?random=1", isPopular: true },
    { name: "Fashion", image: "https://picsum.photos/500?random=1", isPopular: false },
    { name: "Home & Kitchen", image: "https://picsum.photos/500?random=1", isPopular: true },
    { name: "Beauty & Personal Care", image: "https://picsum.photos/500?random=1", isPopular: false },
    { name: "Sports & Outdoors", image: "https://picsum.photos/500?random=1", isPopular: true },
    { name: "Toys & Games", image: "https://picsum.photos/500?random=1", isPopular: false },
    { name: "Automotive", image: "https://picsum.photos/500?random=1", isPopular: true },
    { name: "Books", image: "https://picsum.photos/500?random=1", isPopular: false },
    { name: "Groceries", image: "https://picsum.photos/500?random=1", isPopular: true },
    { name: "Health & Wellness", image: "https://picsum.photos/500?random=1", isPopular: false }
  ];

// Function to seed data
const seedData = async () => {
    try {
        const category = await Category.insertMany(categories);

        
        console.log('Category data seeded Successfully.')
        process.exit();


    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedData();