const express = require('express');
const router = require('express').Router();
const asyncHandler = require("express-async-handler");
const { Pret } = require("../models/pret");
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const{Addpret,updatepret,getpretById,gettAllpret,deletepret}= require("../controllers/pretController");
const multer =require("multer");

const path= require("path");
const passport = require("passport");

/**
 * @desc Ajoute Enonce
 * @route api/todos/ajouter
 * @method post
 */



//image storage

        router.post('/add',Addpret);
    /**
     * @desc update Enonce 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */
router.put("/update/:id",updatepret );

 /**
     * @desc Get All  Enonce 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
router.get("/all",gettAllpret );
 
 /**
     * @desc Get  Enonce By Id
     * @route /api/users/:id
     * @method GET
     * @access private(only admin & user himself)
     */
 router.get("/:id",getpretById)

 /**
     * @desc Delete Enonce 
     * @route /api/users/:id
     * @method DELETE
     * @access private(only admin )
     */
 router.delete("/:id", deletepret)
 router.get("/export");
 
module.exports = router;