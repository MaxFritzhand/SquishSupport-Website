const express = require('express');
// const bodyParser = require('body-parser')
const path = require('path');
const app = express();
// Serve static files from React App
app.use(express.static(path.join(__dirname, 'build')));


// Handles any request that don't match 
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});


app.listen(8080 || '172.31.19.154');

// (8080 || ec2 address)



// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// "ec2-13-58-164-125.us-east-2.compute.amazonaws.com"