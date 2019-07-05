const router = require('express').Router();
const User = require('../models/gallery');

router.get('/',(req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.post('images',(req, res) => {
  const img = req.body.image;
  const description = req.body.description;
  const date = req.body.date;
  const newUser = new User({image: img, description, date});
     newUser.save()
     .then(() => res.json('User added!'))
     .catch(err => res.status(400).json(err));
});

module.exports = router;