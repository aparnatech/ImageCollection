const router = require('express').Router();
const User = require('../models/gallery');
const FileReader = require('filereader')
router.get('/',(req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/images',(req, res) => {
  console.log(req);
  const img = req.body.image;
  const description = req.body.description;
  // var reader  = new FileReader();
  //       reader.addEventListener("load",  () => {
  //           const imageString = reader.result
  //           this.setState({
  //               image: imageString
  //           })
  //       }, false);
  //       reader.readAsDataURL(img);  
  const newUser = new User({image: img, description});
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json(err));
});

module.exports = router;