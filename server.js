const express = require('express')
const path = require('path');

const app = express();

// app.use(express.static('public'))

// app.use('/css',express.static(__dirname+'public/css'))
app.use('/static', express.static('public'))
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.listen(3000);