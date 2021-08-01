const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

// MODELS
const User = require('../models/users');

const { check, validationResult } = require('express-validator/check');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Please add name!').not().isEmpty(),
    check('email', 'Please include a valid email!').isEmail(),
    check('password', 'Please enter a password of more than 6 characters!').isLength({min: 6}),
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({ email: email });

        if(user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User();
        user.name = name;
        user.email = email;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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