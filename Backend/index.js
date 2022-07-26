const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');


//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api',authRouter);
app.use('/api',userRouter);
app.use('/api',categoryRouter);
app.use('/api',orderRoutes);



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

const port = process.env.PORT || 4000;

app.listen(4000,() => {
    console.log("Server running on Port 4000");
});

