const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator')

const {getAllProducts, createProduct,
     writeFile, updateProduct} = require('../services/products')

/* GET products listing. */
router.get('/', function(req, res, next) {
    const allProducts = getAllProducts()
    res.send(allProducts);
});

router.post('/',[
    body("id").isNumeric(),
    body("name").isAlpha().isLength({ min: 3}),
    body("desc").isAlphanumeric().isLength({ min: 3, max: 40 })
] ,function(req, res, next) {
    const error = validationResult(req)

    if(!error.isEmpty()) {
        return res.status(422).json({errors: error.array()})
    }

    const body = req.body; 
    const createRes = createProduct(body);
    if (createRes) {
        return res.send("New product created! :)")
    }

    res.send("Error :(")
})

router.patch('/', function(req, res, next) {
    const body = req.body; 
    // console.log(body)
    const createRes = updateProduct(body.id, body.name, body.desc);
    if (createRes) {
        return res.send("Product updated! :)")
    }
    res.send("Error :(")
})
  
module.exports = router;