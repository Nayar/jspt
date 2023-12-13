let products = [
    { id: 1, name: 'iPhone 15', price: 800 },
    { id: 2,name: 'iPad', price: 650 },
    { id: 3,name: 'iWatch', price: 9500 },
    { id: 4,name: 'Macbook', price: 35000 }
]

get_all_products = function(req,res){ // /api/products/
    res.json(products)
}

get_single_product = function(req,res) { // /api/products/3
    res.json(products.filter(product => product.id == req.params.id)[0])
}

module.exports = {get_all_products,get_single_product}