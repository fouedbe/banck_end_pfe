const express = require("express");
require("./db/connect");

const logger = require("./middlewares/logger");
const { errorHandler, notFound } = require("./middlewares/errors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require('cookie-parser');
const helmet =require("helmet");
const path =require("path");
const cors=require("cors");
const session = require('express-session');
const passport = require('./middlewares/passport');
//init app
const app = express();
app.use(cookieParser());
//port 
const port = process.env.PORT || 3000;
//apply midlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger)

//helmet
app.use(helmet());
//cors
app.use(cors());

app.use(passport.initialize())


   //Routes
app.use("/api/demande", require("./routers/demande"));
app.use("/api/compte", require("./routers/compte"));
app.use("/api/auth", require("./routers/auth"));
app.use("/api/users",require("./routers/users"));
app.use("/api/getImage",require("./routers/image"));



//Error Handler Middleware
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server is running in ${process.env.NODE_ENV} on port ${port}!`));