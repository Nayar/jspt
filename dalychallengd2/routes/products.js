const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router()
const {get_all_products,get_single_product} = require('../controllers/products')

router.get('/', get_all_products)

router.get('/:id',get_single_product)

module.exports = router