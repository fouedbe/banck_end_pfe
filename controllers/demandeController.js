const asyncHandler = require("express-async-handler");
const {Demande,validateDemande,validateUpdateDemande}=require("../models/demande");
const {Compte}=require("../models/Compte");
const { User } = require("../models/User");
const multer =require("multer");
const path= require("path");
/**
     * @desc Post All  hotels 
     * @route /api/hotels
     * @method POST
     * @access private(only admin)
     */
const AddDemande= asyncHandler(
    async(req, res) => {
        try {
            data1 = req.body;
            
            
            demande = new Demande(data1);
            
            savedEnonce = await demande.save();
            filename = '';
            res.send(savedEnonce)
        } catch (err) {
            res.send(err)
        }
    
    
    })
    /**
     * @desc Get All  Users 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
const gettAllDemande= asyncHandler(async(req,res)=>{
    const demandes= await Demande.find();
    res.status(200).send(demandes);
});
  /**
     * @desc Update  User 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */

const updateDemande =asyncHandler(async(req, res) => {
   
    
    
    try {
        const id = req.params.id;
        const newData = req.body;
        const updated = await Demande.findById({ _id: id });
      
        if (!updated) {
          return res.status(404).send('Demande non trouvée');
        }
      
        Object.assign(updated, newData);
        await updated.save();
        if(updated.prix !=0){
            const userAccount = await User.findOne({ email: updated.emailuser });
            if (!userAccount) {
                return res.status(404).send('Compte non trouvé');
              }
            const usercompte = await Compte.findOne({ id_user: userAccount._id  });
            if (!usercompte) {
                return res.status(404).send('Compte bancaire non trouvé');
              }
              const totalAmount = updated.prix * updated.quantity;
              if (usercompte.solde < totalAmount) {
                return res.status(400).send('Solde insuffisant');
              }
              usercompte.solde -= totalAmount;
           await usercompte.save()

        }
        res.status(200).send(updated);
    } catch (err) {
        res.status(400).send(err)
    }
})

 /**
     * @desc Get  annonce By Id
     * @route /api/annonce/:id
     * @method GET
     * @access public
     */
const getDemandeById= asyncHandler(async(req,res)=>{
    const annonce= await Demande.findById(req.params.id);
    if(annonce){
        res.status(200).json(annonce);
    }else {
        res.status(200).json({message:"Demande not found"})
    }
    
})




 /**
     * @desc Delete Demande 
     * @route /api/demande/:id
     * @method DELETE
     * @access private(only admin )
     */

const deleteDemande=asyncHandler(async(req,res)=>{
    const annonce= await Demande.findById(req.params.id);
    if(annonce){
        await Demande.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Demande has been deleted successfully"});
    }else {
        res.status(200).json({message:"Demande not found"})
    }
    
})
    module.exports={AddDemande,updateDemande,getDemandeById,gettAllDemande,deleteDemande}