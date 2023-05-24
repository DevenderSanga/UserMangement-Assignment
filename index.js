const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app=express()
const userRoute=require('./routes/user')
const postRoute=require('./routes/post')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri='mongodb+srv://Devender:2811421Ds@cluster0.pztss3h.mongodb.net/'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas...');
  })
  .catch(err => console.error('Error occurred while connecting to MongoDB Atlas...\n', err));
app.use('/api',userRoute)
app.use('/api',postRoute)


app.listen(3000, () => console.log('Server running......'));