const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

// app.use((req, res) => {
//     res.status(200).json({
//         message: 'it works!'
//     });
// });

module.exports = app;