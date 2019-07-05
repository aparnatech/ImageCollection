const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uploadRouter = require('./routes/upload');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json({limit: '100mb'}));
app.use(cors());

app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb connected");
}
);
app.use('/upload', uploadRouter);
if(process.env.PORT === 'production') {
  app.use(express.static((__dirname, 'client/build'));
  app.get('*', (req, res) => {
    res.sendFile(express.static((__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, ()=> {
    console.log(`server is running on port  : ${port}`);
});