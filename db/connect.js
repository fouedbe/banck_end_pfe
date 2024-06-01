const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
    /*{
useUnifiedTopology: true,

useNewUrlParser: true,
autoIndex: true, //make this also true
})*/
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.error('MongoDB not connected, error : ', err)); 