const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ThisisJWTSecretKey";

//Create a User using : POST "/api/auth/createuser".
router.post("/createuser", [
    check('name', 'Name length should be 3 to 20 characters')
        .isLength({ min: 3, max: 20 }),
    check('email', 'Enter a valid email')
        .isEmail(),
    check('password', 'Password length should be 5 to 10 characters')
        .isLength({ min: 5, max: 10 })
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
    }
})

//User login using : POST "/api/auth/login".
router.post("/login", [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password cannot be blank").exists()
], async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(req.body.password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message);
    }
})

//Get user details after login using: POST "api/auth/getuser"  
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router