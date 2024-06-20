const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const {Compte}=require("../models/Compte");
const {Transaction}=require("../models/transaction");
const bcrypt = require('bcrypt');
const nodemailer = require("./nodemailer");
const jwt = require("jsonwebtoken");
 /**
     * @desc Get All  Users 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
const gettAllUsers = asyncHandler(async(req,res)=>{
    const users= await User.find();
    res.status(200).send(users);
});
  /**
     * @desc Update  User 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */

  const updateUser =asyncHandler(async(req, res) => {
   
    /*if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'you are not allow you ken update your profile' })
    }*/

    try {
        id = req.params.id;
        const salt = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password, salt);
        newData = ({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
           
        });
        updated = await User.findByIdAndUpdate({ _id: id }, newData);
        res.status(200).send(updated);
    } catch (err) {
        res.status(400).send(err)
    }
})


 /**
     * @desc Get  User By Id
     * @route /api/users/:id
     * @method GET
     * @access private(only admin & user himself)
     */
const getUserById= asyncHandler(async(req,res)=>{
    const user= await User.findById(req.params.id).select("-password");
    if(user){
        res.status(200).json(user);
    }else {
        res.status(200).json({message:"user not found"})
    }
    
})




 /**
     * @desc Delete User 
     * @route /api/users/:id
     * @method DELETE
     * @access private(only admin & user himself)
     */
 const deleteUser=asyncHandler(async(req,res)=>{
    try {
        id = req.params.id
        deleteuser= await User.findByIdAndDelete({ _id: id });
        res.send(deleteuser);
    } catch (err) {
        res.send(err)
    }
})
const depotCompte =asyncHandler(async(req, res) => {
   
   
    
    try {
         const { num_compte} = req.params;
         const { solde: amount }   = req.body;
           const compte= await Compte.findOne({num_compte});
           const id =compte._id;
          if( compte.solde >amount ){
           compte.solde=compte.solde-amount;
        
           updated = await Compte.findByIdAndUpdate({ _id: id }, compte);
           res.status(200).send(updated);
          }else{
           console.log("solde inssf");
          }
          const transaction = new Transaction({
            compte: compte._id,
            type: 'retrait',
            montant: amount,
            solde: compte.solde
          });
          await transaction.save();
       } catch (err) {
           res.status(400).send(err)
       }
   })
   const ajoutCompte =asyncHandler(async(req, res) => {
      
      
       
       try {
        const { num_compte} = req.params;
        const { solde: amount }   = req.body;
        const compte= await Compte.findOne({num_compte});
        const id =compte._id;
            
              compte.solde=compte.solde+ parseFloat(amount);
              updated = await Compte.findByIdAndUpdate({ _id: id }, compte);
              res.status(200).send(updated);
              const transaction = new Transaction({
                compte: compte._id,
                type: 'dépôt',
                montant: amount,
                solde: compte.solde
              });
              await transaction.save();
              
          } catch (err) {
              res.status(400).send(err)
          }
      })
      const confirmation = asyncHandler(async (req, res) => {
        try {
          const user = await User.findOne({ activationCode: req.body.activationCode });
      
          if (!user) {
            return res.status(400).json({ message: "Le code d'activation semble être faux !" });
          } else if (user && user.accountStatus) {
            return res.status(400).json({ message: "Votre compte est déjà activé !" });
          } else {
            user.accountStatus = true;
            await user.save();
            return res.json({ message: "Votre compte a été activé avec succès !" });
          }
        } catch (e) {
          console.error("Error:", e);
          res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer plus tard." });
        }
      });
      const forget = asyncHandler(async (req,res)=>{
        try {
            
        
            // Générer un code de réinitialisation aléatoire
            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let resetCode = '';
            for (let i = 0; i < 25; i++) {
              resetCode += characters[Math.floor(Math.random() * characters.length)];
            }
        
            // Mettre à jour l'utilisateur avec le code de réinitialisation
            const user = await User.findOneAndUpdate(
              { email :req.body.email },
            { resetCode },
             
            );
        
            if (user) {
              // Envoyer l'email de réinitialisation
                await nodemailer.sendResetPasswordEmail(req.body.email, resetCode);
              res.status(200).json({ message: 'Email de réinitialisation envoyé avec succès' });
            } else {
              res.status(404).json({ error: 'Aucun compte associé à cet email' });
            }
          } catch (error) {
            res.status(500).json({ error: 'Une erreur est survenue lors de la réinitialisation du mot de passe' });
          }     

   
 
      });
      const upadtepass =asyncHandler(async(req,res)=>{
        try {
            // Trouver l'utilisateur avec le code de réinitialisation fourni
            const user = await User.findOne({ resetCode: req.body.resetCode });
        
            if (user) {
              // Générer un nouveau mot de passe haché
              const salt = await bcrypt.genSalt(10);
              const newPassword = await bcrypt.hash(req.body.password, salt);
        
              // Mettre à jour le mot de passe de l'utilisateur
              await User.findByIdAndUpdate(user._id, { password: newPassword });
        
              // Supprimer le code de réinitialisation
              await User.findByIdAndUpdate(user._id, { resetCode: null });
        
              return res.json({ message: "Mot de passe mis à jour avec succès !" });
            } else {
              return res.status(404).json({ message: "Le code de réinitialisation est invalide." });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Une erreur est survenue lors de la réinitialisation du mot de passe." });
          }
      })
     
module.exports={
    gettAllUsers,
    updateUser,
    getUserById ,
    deleteUser,
    ajoutCompte,
    depotCompte,
    confirmation,
    forget,
    upadtepass
}