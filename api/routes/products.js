
const express = require('express');
// router가 express 기능을 함?
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/product');


// 라우터.get  값을 우리가 보고싶을때 가져와야할때
router.get('/' , (req , res , next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then( docs => {
            // console.log(docs);
            res.status(200).json(docs);
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id
                    }
                })
            }
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    // res.status(200).json({
    //     message:'handling Get requests to /products'
    // });
});




// 값을 우리가 보낼때 요청전문을 보낼때 정도?
router.post('/' , (req , res , next) => {

    //post할때 값을 읽어오는 부분  body의 name을 req해와서 name에 지정?  price도 같음 그걸 product에 지정
    // const product  = {
    //     name: req.body.name,
    //     price: req.body.price
    // };




    // mongoose db 사용부분 하지만 지금 주석풀고 실행하면 에러발생으로 주석했습니다
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:"Created product successfully",
                createdProduct:{
                    name:result.name,
                    price:result.price,
                    _id:result._id
                }
            });

        })

        .catch(  err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });



    // res.status(200).json({
    //     message:'handung post requests to /products',
    //
    //     //위에서 파싱한 product를 생성하는부분? createdstatus 정확한역활 찾아봐야함
    //     createdstatus : product
    // });

});



// 값을 우리가 해당 productID로 찾을때   http://localhost:3000/products/special   등
router.get('/:productId' , (req , res , next) => {


    const id = req.params.productId;


    if (id === 'special') {
        // productID 가 special 일때
        // =이 3개 : 타입까지 동일
        res.status(200).json ({
            message:'you discoverd th special ID',
            id : id
        });
    }else{
        // productID 가 special 아닐때
        res.status(200).json ({
            message:'you passed  ID'

        });
    }
});


// patch productId의 변경이 필요한경우

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    // const list_1 = [];
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
        // updateOps[req.body['propName']] = req.body['value'];
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id,
                    message: req.body.value
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err, id
            });
        });

    // Product.update({_id: id}, {$set: {name: req.body.newName, price: req.body.newPrice}})

    // res.status(200).json({
    //     message: 'Updated product!'
    // });
});



// patch productId의 삭제가 필요한경우
router.delete('/:productId' , (req , res , next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'product deleted',
                request: {
                    type:'POST',
                    url: 'http://localhost:3000/products/' + id,
                    body: {name: 'String', price: 'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })


    // res.status(200).json ({
    //     message:'delete prodoct'
    // });

});



// router가 작동을 핧수있도록 써줘야하는 줄
module.exports = router;