const express = require('express');
const Banner = require('../models/Banner');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary');
const upload = multer({ storage });

const router = express.Router();

// @route POST /api/banner
// @desc create a banner
// @access Private, admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
    try {
        const banner = new Banner({
            image: { url: req.file.path, altText: req.file.filename }
        });

        await banner.save();
    
        res.status(201).json({message: "Banner created successfully."})
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route GET /api/banner
// @desc All banner fetch
//* @access Public
router.get('/', async (req, res) => {
    try {
        const banner = await Banner.find({});

        res.json(banner);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


// @route Delete /api/banner/:id
// @desc delete specific banner
// access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if (banner) {
            //* Deleting the existing image from cloudinary
            await cloudinary.uploader.destroy(banner.image.altText);
            
            await banner.deleteOne();
            res.json({message: "Banner removed"});
        } else {
            res.status(404).json({message: "Banner not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;