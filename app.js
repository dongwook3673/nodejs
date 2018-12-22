const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

mongoose.connect(
    "mongodb+srv://dongwook:dongwook@cluster0-zy7je.mongodb.net/test?retryWrites=true", {
    }
);

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

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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