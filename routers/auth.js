const express = require('express');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const nodemailer = require("../controllers/nodemailer");
const { User, validateRegistreUser, validateLoginUser } = require("../models/User")
    /**
     * @desc Register new User 
     * @route / api / auth / register 
     * @method post
     */
router.post("/register", asyncHandler(async(req, res) => {
    const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomCode = "";
  for (let i = 0; i < 25; i++) {
    randomCode += characters[Math.floor(Math.random() * characters.length)];
  }

  let resetCode = "";
  for (let i = 0; i < 25; i++) {
    resetCode += characters[Math.floor(Math.random() * characters.length)];
  }
    const { error } = validateRegistreUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({ message: "this user already registred" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role:req.body.role,
        activationCode: randomCode,
        resetCode: resetCode,
       
    });

    const result = await user.save();
    
    nodemailer.sendConfirmationEmail(
        user.username,
        user.email,
        user.activationCode,
       
      );
    const token = user.generateToken();
    const { password, ...other } = result._doc;
    res.status(201).json({...other, token });
   

}));
/**
 * @desc login  User 
 * @route /api/auth/login 
 * @method post
 */
router.post("/login", asyncHandler(async(req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ message: "invalid email or password" });
    }
    
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid  email or password" });
    }
    if(user.accountStatus == false){
        return res.status(400).json({ message: "invalid code activation" });
    }
    
    var token = jwt.sign({ 
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role
     }, process.env.JWT_SECRET_KEY,  { expiresIn: '1h' });
     res.status(200).json({
       message: "success",
       token: "Bearer "+token
     })
  
  const { password, ...other } = user._doc;
  res.status(200).json({...other, token });


}));

module.exports = router;