const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateUser = require("../middleware/authenticateUser");

const jwtSecret = process.env.JWT_SECRET;


// Create a user using POST - at /api/auth/createuser
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 })
], async (req, res) => {
    let success = false;

    // If there are errors return the bad request and all errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success,
            errors: errors.array()
        });
    }
    try {
        // Check if email already exists
        let user = await User.findOne({ email: req.body.email });
        if(user) {
            return res.status(400).json({
                success,
                error: 'This email already exists.'
            })
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, jwtSecret);

        // res.json(user)
        success = true
        res.json({ success, authToken })
    } catch(error) {
        console.error(error.message);
        res.status(500).send('An error occurred');
    }
});


// Authenticate a user using POST - at /api/auth/login (log in not necessary)
router.post('/login', [
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    // If there are errors return the bad request and all errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user) {
            success = false;
            return res.status(400).json({
                success,
                error: 'Please try to log in with the correct credentials'
            })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            success = false;
            return res.status(400).json({
                success,
                error: 'Please try to log in with the correct credentials'
            })
        }

        const data = {
            user: { user: user.id }
        }

        const authToken = jwt.sign(data, jwtSecret);
        success = true;
        res.send({ success, authToken });

    } catch(error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
});


// Get User details using POST - at /api/auth/getuser (log in not necessary)
router.post('/getuser', authenticateUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
});



module.exports = router;
 