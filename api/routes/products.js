const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Handling GET requests to /products'
    });
});



router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

router.post('/', (req, res, next) =>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    // const product  = new Prouct({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     price: req.body.price
    // });

    res.status(200).json({
        message:'handling post requests to /products',

        //
        createdstatus: product
    });

});

module.exports = router;