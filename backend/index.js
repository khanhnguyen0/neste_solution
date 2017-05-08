const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const assert = require('assert')

var PORT = process.env.PORT || 5000
mongoose.connect('mongodb://root:root@ds133241.mlab.com:33241/neste')
var Form = require('./model/Form.js');

mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, global.Promise);

const corsOption = {
    origin: "*",
    credentials: true
}

app.use(bodyparser.json())
app.use('/', cors(corsOption))

app.post('/category/new', (req, res) => {
    console.log('new category :', req.body.form.category);
    var Cat = new Form({category: req.body.form.category, data: req.body.form.data});
    Cat.save((err, c) => {
        if (err)
            return res.status(500).send('Database Error');
        return res.json({id: c._id});
    })
})

app.get('/category/', (req,res) =>{
  Form.find({},(err,f)=>{
    if (err) return res.status(500).send('database error');
    return res.json({list:f.map(f=>f.category)});
  })
});

server.listen(PORT, () => {
    console.log('Running on port', PORT)
})
