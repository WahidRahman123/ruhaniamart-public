const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route POST /api/users/register

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Registration Logic
        let user = await User.findOne({ email });

        if(user) return res.status(400).json({message: "User already exists"})

        user = new User({ name, email, password });
        await user.save();

        //JWT
        const payload = { user: { id: user._id, role: user.role }};

        // Token Creation and sending
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
            if (err) throw err;

            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, 
                token
            })
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
});


// @route POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user) return res.status(400).json({message: "Invalid Credentials"});

        const isMatch = await user.matchPassword(password);

        if(!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        //JWT
        const payload = { user: { id: user._id, role: user.role }};

        // Token Creation and sending
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
            if (err) throw err;

            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, 
                token
            })
        });

    } catch(error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
    res.json(req.user)
})

module.exports = router