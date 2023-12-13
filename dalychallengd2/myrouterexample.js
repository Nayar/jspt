const express = require('express')
const app = express()

const product_routes = require('./routes/products')

app.use(express.json())

app.listen(5001,'localhost',function() {console.log('express is running')})

app.use('/api/products',product_routes)

// /api/users POST for creating user
// /api/users/login POST send username/password; returns cookie
// /api/products GET; check if cookie present

