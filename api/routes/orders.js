const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const id = req.params.rderId;
    if(id === '12345'){
        res.status(200).json({
            message:'you discovered the 12345 ID',
            id : id
        });
    }else{
        //product ID가  스페셜 아닐때
        res,status
    }
    res.status(200).json({
        message : 'Handling GET requests to /orders'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message : 'Handling GET requests to /orders'
    });
});

router.patch('/',(req, res, next) => {
    res.status(200).json({
        message : 'Handling PATCH requests to /orders'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message : 'Handling DELETE requests to /orders'
    });
});

module.exports = router;