const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
});

router.post('/add-to-cart/:id', (req, res) => {
    // Lógica para agregar al carrito
});

module.exports = router;
