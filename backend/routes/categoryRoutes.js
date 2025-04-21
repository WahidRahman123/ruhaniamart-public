const express = require('express');
const Category = require('../models/Category');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary');
const upload = multer({ storage });

const router = express.Router();

// @route POST /api/category
// @desc create category list
// @access Private, admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
    const { name, isPopular } = req.body;

    try {
        const category = new Category({ 
            name,
            isPopular
         });

        category.image = { url: req.file.path, altText: req.file.filename };

        await category.save();
    
        res.status(201).json({message: "Category created successfully."})
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route GET /api/category
// @desc All category fetch
//* @access Public
router.get('/', async (req, res) => {
    try {
        const category = await Category.find({});

        res.status(201).json(category);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


// @route GET /api/category/popular
// @desc All category fetch
//* @access Public
router.get('/popular', async (req, res) => {
    try {
        const category = await Category.find({ isPopular: true }).limit(12);


        res.status(201).json(category);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


// @route PUT /api/category/:id
// @desc create category list
// @access Private, admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, isPopular } = req.body;

    try {
        const category = await Category.findById(id);

        if(category) {
            category.name = name || category.name;
            category.isPopular = isPopular || category.isPopular;

            //* Images update
            if(req.file) {
                // 1. Deleting the existing image on cloudinary
                await cloudinary.uploader.destroy(category.image.altText);

                // 2. Replace the image with the new one
                category.image = { url: req.file.path, altText: req.file.filename };
            }

            await category.save();

            res.status(201).json({message: 'Category updated successfully'});

        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


// @route Delete /api/category/:id
// @desc delete specific category
// access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            //* Deleting the existing image from cloudinary
            await cloudinary.uploader.destroy(category.image.altText);
            
            await category.deleteOne();
            res.json({message: "Category removed"});
        } else {
            res.status(404).json({message: "Category not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


// @route GET /api/category/:id
// @desc specific category fetching
// @access Private/Admin
router.get("/:id", protect, admin, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if(category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({message: "Category not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})




module.exports = router;