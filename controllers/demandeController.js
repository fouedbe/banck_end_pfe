const asyncHandler = require("express-async-handler");
const {Demande,validateDemande,validateUpdateDemande}=require("../models/demande")
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
        updated = await Demande.findByIdAndUpdate({ _id: id }, newData);
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
 /*const deleteHotel=asyncHandler(async(req,res)=>{
    const annonce= await User.findById(req.params.id);
    if(annonce){
        await Annonce.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"annonce has been deleted successfully"});
    }else {
        res.status(404).json({message:"annonce not found"})
    }
    
})*/
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