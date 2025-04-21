const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/user');
const Cart = require('../models/Cart');
const products = require('../data/products');

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);


// Function to seed data
const seedData = async () => {
    try {
        await Product.deleteMany();
        // await User.deleteMany();
        // await Cart.deleteMany();

        // const createdUser = await User.create({
        //     name: "Admin User",
        //     email: "admin@example.com",
        //     password: "123456",
        //     role: 'admin'
        // })

        // Assign the default user ID to each product
        const user = await User.find();
        const userId = user[0]._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: userId};
        })

        await Product.insertMany(sampleProducts);
        console.log('Product data seeded Successfully.')
        process.exit();


    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedData();