const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uploadRouter = require('./routes/upload');
const path = require("path")
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
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb connected");
}
);
app.use('/upload', uploadRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(port, ()=> {
    console.log(`server is running on port  : ${port}`);
});