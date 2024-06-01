const express  = require("express");
const { object } = require("joi");
const { Collection } = require("mongoose");
const router = express.Router();
const multer =require("multer");
const path= require("path");
const { Annonce } = require("../models/demande");
const imagesDir = path.join(__dirname, 'images');
const storage = multer.diskStorage ({
    destination: function (req, file, cb){
    cb(null, path.join(__dirname, "../images"));
    },
    filename: function (req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g,"-") + file.originalname);
    }
    });
    const upload = multer({ storage });


    // api/upload
    router.post("/",upload.array("image"), async(req,res) => {
    res.status (200).json({message: "image uploaded"});
    })
    router.get("/:imageName", async(req,res) => {
      /* res.status (200).json({message: "image uploaded"});
        const imagedata=await Annonce.findOneById('652b24ecbb38be5eaedf6a30')
        res.json({imagedata});*/
        const imageName = req.params.imageName;
        const imagePath = path.join(imagesDir, imageName);
      
        // Envoyez l'image en réponse
        res.sendFile(imagePath);
        })
    
module.exports=router;