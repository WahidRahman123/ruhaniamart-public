const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { protect, admin } = require('../middleware/authMiddleware');
const Review = require('../models/Review');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary');
const upload = multer({ storage });

const router = express.Router();


// @route POST /api/products
// @desc Create new products
// @access private/Admin
router.post('/', protect, admin, upload.array('images'), async (req, res) => {
    try {
        const { name, description, originalPrice, discountPrice, countInStock, categoryName, brand, tags, dimensions, weight } = req.body;

        // search the category in category
        let category = await Category.findOne({ name: categoryName });

        const product = new Product({ 
            name, 
            description, 
            originalPrice, 
            discountPrice, 
            countInStock,
            category: category._id, //* Category has been edited later
            brand, 
            tags, 
            dimensions, 
            weight, 
            user: req.user._id  // Reference to the admin user who created it
        });

        if(discountPrice > 0) {
            product.price = discountPrice
        } else {
            product.price = originalPrice
        }

        product.images = req.files.map(f => ({url: f.path, altText: f.filename}));

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})


// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id", protect, admin, upload.array('images'), async (req, res) => {
    try {
        const { name, description, originalPrice, discountPrice, countInStock, categoryName, brand, tags, dimensions, weight } = req.body;

        // search the category in category
        let category = await Category.findOne({ name: categoryName });
        

        const product = await Product.findById(req.params.id);

        if(product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.originalPrice = originalPrice || product.originalPrice;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category._id || product.category;                //* Category has been edited later
            product.brand = brand || product.brand;

            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;

            if(discountPrice > 0) {
                product.price = discountPrice || product.price
            } else {
                product.price = originalPrice || product.price
            }

            //* Images update
            if (req.files && req.files.length > 0) {
                const imgs = req.files.map(f => ({url: f.path, altText: f.filename}));
                product.images.push(...imgs);
            }

            await product.save();
            //* deleting the deleteImages 
            if(req.body.deleteImages) {
                for(let altText of req.body.deleteImages) {
                    await cloudinary.uploader.destroy(altText);
                }
                await product.updateOne({$pull: {images: {altText: {$in: req.body.deleteImages}}}});
            }
            res.json({message: "Product updated successfully!"});

        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

// @route DELETE /api/products/:id
// @access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Review.deleteMany({
                _id: {$in: product.reviews}
            });

            //* Deleting the cloudinary images as well
            for(let image of product.images) {
                await cloudinary.uploader.destroy(image.altText);
            }

            await product.deleteOne();
            res.json({message: "Product removed"})

        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

// @route GET /api/products
//* @desc GET all products with optional query filters
// @access Public

router.get('/', async (req, res) => {
    try {
        const { categoryId, search } = req.query;
        
        let query = {};

        if (categoryId && categoryId.toLocaleLowerCase() !== "all") {
            query.category = categoryId;
        }

        // For search query
        if (search) {
            // query.$or = [
            //     {name: {$regex: search, $options: 'i'}},
            //     {description: {$regex: search, $options: 'i'}}
            // ]

            query.name = {$regex: search, $options: 'i'}
        }
        //* if you have more to filter, then just add it to the query like this


        // Fetch products and apply sorting and limit
        let products = await Product.find(query);
        
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

// @route GET /api/products/similar/:id
// @desc Retrive similar products based on the current product's category
// @access Public
router.get('/similar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);

        if(!product) {
            res.status(404).json({message: 'Product Not Found'});
        }

        const similarProducts = await Product.find({
            _id: {$ne: id}, 
            category: product.category
        }).limit(10);

        res.json(similarProducts);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})

// @route GET /api/products/:id
//* @desc Get a single product with populated reviews
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({
            path: 'reviews',
            populate: {
                path: 'user'
            }
        })
        .populate('category'); 
        if(product) {
            res.json(product);
        } else {
            res.status(404).json({message: 'Product Not Found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})






module.exports = router;