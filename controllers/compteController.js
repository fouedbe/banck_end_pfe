const asyncHandler = require("express-async-handler");
const {Compte,validateCompte,validateUpdateDemande}=require("../models/Compte")
const multer =require("multer");
const path= require("path");
/**
     * @desc Post All  comptes
     * @route /api/compte
     * @method POST
     * @access private(only admin)
     */
const AddCompte= asyncHandler(
    async(req, res) => {
        try {
            data1 = req.body;
            
            compte = new Compte(data1);
            
            savedEnonce = await compte.save();
            filename = '';
            res.send(savedEnonce)
        } catch (err) {
            res.send(err)
        }
    
    
    })
    /**
     * @desc Get All  compte
     * @route /api/compte
     * @method GET
     * @access private(only admin)
     */
const gettAllCompte= asyncHandler(async(req,res)=>{
    const comptes= await Compte.find();
    res.status(200).send(comptes);
});
  /**
     * @desc Update  User 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */

const updateCompte =asyncHandler(async(req, res) => {
   
    /*if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'you are not allow you ken update your profile' })
    }*/

   /* const { error } = validateUpdateAnnonce(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }*/
    
    try {
        id = req.params.id;
        newData = req.body;
        updated = await Compte.findByIdAndUpdate({ _id: id }, newData);
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
const getCompteById= asyncHandler(async(req,res)=>{
    const compte= await Compte.findById(req.params.id);
    if(compte){
        res.status(200).json(compte);
    }else {
        res.status(200).json({message:"Demande not found"})
    }
    
})

const depotCompte =asyncHandler(async(req, res) => {
   
   
    
 try {
        id = req.params.id;
        const  amount  = req.body.solde;
        const compte= await Compte.findById(id);
       if( compte.solde >amount ){
        compte.solde=compte.solde-amount;
        updated = await Compte.findByIdAndUpdate({ _id: id }, compte);
        res.status(200).send(updated);
       }else{
        console.log("solde inssf");
       }
        
    } catch (err) {
        res.status(400).send(err)
    }
})
const ajoutCompte =asyncHandler(async(req, res) => {
   
   
    
    try {
           id = req.params.id;
           const  amount  = req.body.solde;
           const compte= await Compte.findById(id);
         
           compte.solde=compte.solde+ parseFloat(amount);
           updated = await Compte.findByIdAndUpdate({ _id: id }, compte);
           res.status(200).send(updated);
         
           
       } catch (err) {
           res.status(400).send(err)
       }
   })
   

 /**
     * @desc Delete Demande 
     * @route /api/demande/:id
     * @method DELETE
     * @access private(only admin )
     */
 /*const deleteHotel=asyncHandler(async(req,res)=>{
    const annonce= await User.findById(req.params.id);
    if(annonce){
        await Annonce.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"annonce has been deleted successfully"});
    }else {
        res.status(404).json({message:"annonce not found"})
    }
    
})*/
const deleteCompte=asyncHandler(async(req,res)=>{
    const annonce= await Compte.findById(req.params.id);
    if(annonce){
        await Compte.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Demande has been deleted successfully"});
    }else {
        res.status(200).json({message:"Demande not found"})
    }
    
})
    module.exports={AddCompte,updateCompte,getCompteById,gettAllCompte,ajoutCompte,depotCompte,deleteCompte}