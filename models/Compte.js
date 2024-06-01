const { binary } = require('joi');
const mongoose = require('mongoose');
constjoi = require('joi');
const compte_schema = new mongoose.Schema({
    num_compte: {
        type: Number,
        

    },
    id_user: {
        type:String
    },
    type: {
        type: String,
        required: true
    },
    solde: {
        type: Number,
        
    },
}, { timestamps: true })
const Compte = mongoose.model("Compte ", compte_schema);

function validateCompte(obj) {
    const schema = joi.object({
        num_compte: joi.Number().trim().min(3).max(255),
       solde: joi.Number().trim(),
        type: joi.String().trim().min(3).max(255)
    })
}
module.exports = {
    Compte,
    validateCompte
   
}