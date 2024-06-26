const express = require('express');
const router = require('express').Router();
const asyncHandler = require("express-async-handler");
const { Demande, validateUpdateDemande } = require("../models/demande");
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const{AddDemande,updateDemande,getDemandeById,gettAllDemande,deleteDemande}= require("../controllers/demandeController");
const multer =require("multer");

const path= require("path");
const passport = require("passport");





//image storage

        router.post('/add',AddDemande);
    /**
     * @desc update Enonce 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */
router.put("/update/:id",updateDemande );

 /**
     * @desc Get All  Enonce 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
router.get("/all",gettAllDemande );
 
 /**
     * @desc Get  Enonce By Id
     * @route /api/users/:id
     * @method GET
     * @access private(only admin & user himself)
     */
 router.get("/:id",getDemandeById)

 /**
     * @desc Delete Enonce 
     * @route /api/users/:id
     * @method DELETE
     * @access private(only admin )
     */
 router.delete("/:id", deleteDemande)
 router.get("/export");
 
module.exports = router;