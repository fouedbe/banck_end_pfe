const express = require('express');
const router = require('express').Router();
const asyncHandler = require("express-async-handler");
const  {Transaction } = require("../models/transaction");

const multer =require("multer");
const { ROLES, inRole } = require("../middlewares/roles");
const path= require("path");
const passport = require("passport");

/**
 * @desc Ajoute Enonce
 * @route api/todos/ajouter
 * @method post
 */


router.get('/', asyncHandler(async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.status(200).send(transactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }));
 
module.exports = router;