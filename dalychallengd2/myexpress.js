const express = require('express')
const app = express()

app.use(express.json()); // important for POST parsing

app.listen(5001,function() {console.log('express is running')})

let products = [
    { id: 1, name: 'iPhone 15', price: 800 },
    { id: 2,name: 'iPad', price: 650 },
    { id: 3,name: 'iWatch', price: 750 }
]


const blockbyip = (req, res, next) => {
    console.log("Hello Middleware");
    console.log(req.socket.remoteAddress)
    if(req.socket.remoteAddress === '::ffff:10.9.157.106'){
        res.end('stopped by middleware.  to pena drwa')
    }
    else
        next();
}

const auth = (req, res, next) => {
    const user = req.query.user
    if (user === 'admin') {
        req.user = { name: 'admin', id: 1 }
        next()
    } else {
        res.status(401).send('Unauthorized')
    }
}


app.use([blockbyip,auth]);

app.get('/', function(request,response){
    response.sendFile('/Users/nayar/codes/jsptclass/dalychallengd2/myhome.html')
})

app.get('/', function(request,response){
    response.sendFile('/Users/nayar/codes/jsptclass/dalychallengd2/myhome.html')
})

app.get('/contact', function(request,response){
    response.send('This is my contact page')
})

app.get('/api/products', (req, res) => {
    // select * from products
    console.log(req.query.price)
    if(req.query.price){
        res.json(products.filter(product => product.price == req.query.price))
    }
    else
        res.json(products)
});

app.get('/api/products/:id', (req, res) => {
    res.json(products.filter(product => product.id == req.params.id))
});

app.post('/api/products', function(req,res) {
    console.log(req.body)
    products.push(req.body)
    // insert into products values (req.body.name,....)
    res.send('Product added to database')
})

app.delete('/api/products/:id', function(req,res) {
    console.log("Deleting " + req.params.id)
    products = products.filter(product => product.id != req.params.id)
    res.send('Product deleted')
})

app.patch('/api/products/:id', function(req,res){
    product = products.filter(singleproduct => singleproduct.id == req.params.id)[0]
    console.log(req.body)
    for (var key in req.body){
        if(key == 'price' && req.body[key] < 0){
            res.send('Price is not valid')
        }
        product[key] = req.body[key]
        //product['price'] = 7500
    }
    res.send('Product updated')
})

app.get('/user/:user', function(req,res){
    var user = req.params.user
    res.end(user)
})

// HTTP REQ  >> app.use(): HTTP RESPONSE  >> app.get('/contact'): HTTP RESPONSE