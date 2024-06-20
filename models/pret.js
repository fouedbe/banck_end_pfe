const { binary } = require('joi');
const mongoose = require('mongoose');
constjoi = require('joi');
const pret_schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    loanAmount:  {
        type: Number
    },
    loanTerm:{
        type: Number
    },
    interestRate:{
        type: Number
    },
    propertyValue:{
        type: Number
    },
}, { timestamps: true })
const Pret = mongoose.model("Pret ", pret_schema);

function validatePret(obj) {
    const schema = joi.object({
        loanAmount : joi.Number().trim(),
        loanTerm: joi.Number().trim(),
       email: joi.String().trim().min(3).max(255)
    })
}
module.exports = {
    Pret,
    validatePret
   
}