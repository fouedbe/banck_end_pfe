const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const user_Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,

    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,


    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,

    },
    isAdmin: {
        type: Boolean,
        default: false


    },
    fournisseur:{
        type: Boolean,
        enum: ['true', 'false']
    },
    role:{
        type: String,
        enum: ['USER','FOURNISSEUR','ADMIN']
    },
    accountStatus: {
        type: Boolean,
        default: false,
      },
      activationCode: {
        type: String,
      },
      resetCode: {
        type: String,
      },
   
}, { timestamps: true });




// Generate Token

user_Schema.methods.generateToken = function() {
return jwt.sign({ id: this._id, isAdmin: this.isAdmin,email:this.email }, process.env.JWT_SECRET_KEY);
}

//userModel
const User = mongoose.model("User", user_Schema);

//validate Registre User
function validateRegistreUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        username: Joi.string().trim().min(2).max(200).required(),
        password: Joi.string().trim().min(8).required(),
        role:Joi.string().trim()
        
    });
    return schema.validate(obj);
}
//validate login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),

    });
    return schema.validate(obj);
}
//validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).email(),
        username: Joi.string().trim().min(2).max(200),
        password: Joi.string().trim().min(8),
        
    });
    return schema.validate(obj);
}


module.exports = {
    User,
    validateLoginUser,
    validateUpdateUser,
    validateRegistreUser
}