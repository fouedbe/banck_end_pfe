const { binary } = require('joi');
const mongoose = require('mongoose');
constjoi = require('joi');
const demande_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    emailuser: {
        type:String
    },
    description: {
        type: String,
        required: true
    },
    prix:{
        type: String,
        
    },

    fournisseur: {
        type: String,
        
    },
    status: {
        type: String,
        
    }, 
    date: {
        type: String,
        
    },
    quantity: {
        type: String,
        
    },
}, { timestamps: true })
const Demande = mongoose.model("Demande ", demande_schema);

function validateDemande(obj) {
    const schema = joi.object({
        title: joi.String().trim().min(3).max(255),
       
        description: joi.String().trim().min(3).max(255)
    })
}
module.exports = {
    Demande,
    validateDemande
   
}