const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

// MODELS
const User = require('../models/users');

// Middleware
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator/check');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
 
// @route   POST api/users
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    check('email', 'Please incldue a valie email').isEmail(),
    check('password', 'Password is Required').exists()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email: email });

        if(!user) {
            return res.status(400).json({ msg: 'Invalid Credeintials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credeintials' });
        }

        payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;

            res.json({token});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;