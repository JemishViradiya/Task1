const express = require('express');
const cors = require('cors');
const monk = require('monk'); // Add monk library
const Filter = require('bad-words')
//const ratelimit = require('express-rate-limit') //add ratelimit library to track all the devices

const app = express();

const db = monk(process.env.MONGO_URI||'localhost/twitters');  //create database name twitters
const twitts =db.get('twitts') //create collector name twitts
const filter = new Filter();
app.use(cors());
app.use(express.json())
// app.use(ratelimit({
//     windowMs: 60*1000,
//     max:1
// }))

app.get('/', (req,res)=>{   //Get the data from the use 
    res.json({
        message: 'Twitter'
    });
})


app.get('/twits', (req,res)=>{
    twitts
    .find()
    .then(twitts=>{
        res.json(twitts);
    })
})

// app.use(ratelimit({
//     windowMs: 60*1000,
//     max:1
// }))

function isValidtwit(data){
    return data.name && data.content.toString().trim()!=='' &&
    data.content && data.name.toString().trim()!=='';
}

app.post('/twits', (req,res)=>{ //Receive the data from the server
    if(isValidtwit(req.body)){
        const valid_data={
            name: filter.clean(req.body.name.toString()),  
            conten:filter.clean(req.body.content.toString()),
            created: new Date()
        }
        twitts                                  //insert data into database
            .insert(valid_data)
            .then(createdtweet=>{
                res.json(createdtweet)
                console.log(createdtweet)
            });
    }
    else{
        res.status(422);
        res.json({message:'Please enter name and your twitter content!'})
    }
    // console.log(req.body)
})

app.listen(5000,()=>{
    console.log("Listening 5000 ");
})