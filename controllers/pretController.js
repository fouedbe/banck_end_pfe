const asyncHandler = require("express-async-handler");
const { Pret } = require("../models/pret");
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
const Addpret= asyncHandler(
    async(req, res) => {
        try {
            data1 = req.body;
            
            
            pret = new Pret(data1);
            
            savedEnonce = await pret.save();
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
const gettAllpret= asyncHandler(async(req,res)=>{
    const prets= await Pret.find();
    res.status(200).send(prets);
});
  /**
     * @desc Update  User 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */

const updatepret =asyncHandler(async(req, res) => {
   
    
    
    try {
        const id = req.params.id;
        const newData = req.body;
        const updated = await Pret.findById({ _id: id });
      
        if (!updated) {
          return res.status(404).send('pret non trouvée');
        }
      
        Object.assign(updated, newData);
        await updated.save();
        
            const userAccount = await User.findOne({ email: updated.email });
            if (!userAccount) {
                return res.status(404).send('Compte non trouvé');
              }
            const usercompte = await Compte.findOne({ id_user: userAccount._id  });
            if (!usercompte) {
                return res.status(404).send('Compte bancaire non trouvé');
              }
            
           await usercompte.save()

        
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
const getpretById= asyncHandler(async(req,res)=>{
    const annonce= await Pret.findById(req.params.id);
    if(annonce){
        res.status(200).json(annonce);
    }else {
        res.status(200).json({message:"pret not found"})
    }
    
})




 /**
     * @desc Delete Demande 
     * @route /api/demande/:id
     * @method DELETE
     * @access private(only admin )
     */

const deletepret=asyncHandler(async(req,res)=>{
    const annonce= await Pret.findById(req.params.id);
    if(annonce){
        await Pret.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Demande has been deleted successfully"});
    }else {
        res.status(200).json({message:"Demande not found"})
    }
    
})
    module.exports={Addpret,updatepret,getpretById,gettAllpret,deletepret}