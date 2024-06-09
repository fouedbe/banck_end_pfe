const express = require('express');
const router = require('express').Router();
const asyncHandler = require("express-async-handler");
const { Compte, validateUpdateDemande } = require("../models/Compte");
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const{AddCompte,updateCompte,retraitCompte,ajoutCompte,getCompteById,gettAllCompte,deleteCompte}= require("../controllers/compteController");
const multer =require("multer");
const { ROLES, inRole } = require("../middlewares/roles");
const path= require("path");
const passport = require("passport");

/**
 * @desc Ajoute Enonce
 * @route api/todos/ajouter
 * @method post
 */



//image storage

        filename = '';
        const mystorage = multer.diskStorage({
        
            destination: './images',
            filename: (req, file, redirect) => {
                let date = Date.now();
        
                let fl = date + '.' + file.mimetype.split('/')[1];
                redirect(null, fl);
                filename = fl;
        
            }
        })
        const upload = multer({ storage: mystorage });
        
        router.post('/add',AddCompte);
    /**
     * @desc update Enonce 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */
router.put("/update/:id",updateCompte );

 /**
     * @desc Get All  Enonce 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
router.get("/all",gettAllCompte );
router.put("/depot/:id",ajoutCompte );
router.put("/retrait/:id",retraitCompte );
 /**
     * @desc Get  Enonce By Id
     * @route /api/users/:id
     * @method GET
     * @access private(only admin & user himself)
     */
 router.get("/:id",getCompteById)

 /**
     * @desc Delete Enonce 
     * @route /api/users/:id
     * @method DELETE
     * @access private(only admin )
     */
 router.delete("/:id", deleteCompte)
 router.get("/export");
 
module.exports = router;