const express = require('express');
const bcrypt = require('bcrypt');
const router = require('express').Router();

const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const passport = require("passport");
const roles = require("../middlewares/roles");
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const{gettAllUsers,upadtepass, forget,deleteUser,confirmation,getUserById,updateUser,ajoutCompte,depotCompte}= require("../controllers/userContoller");

    /**
     * @desc update User 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */
router.put("/:id",updateUser );

 /**
     * @desc Get All  Users 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
router.get("/",passport.authenticate('jwt', { session: false }),roles,gettAllUsers);
router.put("/ajout/:num_compte",ajoutCompte );
router.put("/depot/:num_compte",depotCompte );
router.post("/confirm_user",confirmation );
router.post("/forget",forget );
router.post("/updatepass",upadtepass );
 /**
     * @desc Get  User By Id
     * @route /api/users/:id
     * @method GET
     * @access private(only admin & user himself)
     */
 router.get("/:id",getUserById)

 /**
     * @desc Delete User 
     * @route /api/users/:id
     * @method DELETE
     * @access private(only admin & user himself)
     */
 router.delete("/:id",deleteUser)
 
module.exports = router;