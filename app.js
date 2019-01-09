const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

mongoose.connect(
    "mongodb://dongwook:dongwook1@ds145704.mlab.com:45704/node-rest-shop",
    { useNewUrlParser: true}
);

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use( (req, res, next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});
// app.use((req, res) => {
//     res.status(200).json({
//         message: 'it works!'
//     });
// });



// app.use((req,res,next) =>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers, Origin, X=Requested-With, Content-Type');
//     if(res.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).toJSON({});
//     }
//     next();
// });


module.exports = app;