const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth = require('./routes/auth');



//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/auth',auth);


//db 
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    dbName:'t-shirt'
}).then(() => {
    console.log("DB CONNECTED");
}).catch(err => {
    console.log("DB FAILED");
});

const port = process.env.PORT || 3000;

app.listen(3000,() => {
    console.log("Server running on Port 3000");
})