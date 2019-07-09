const router = require('express').Router();
const User = require('../models/gallery');
const mongoose = require('mongoose');
router.get('/',(req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/images',(req, res) => {
  const img = req.body.image;
  const description = req.body.description;
  const date = req.body.date;
  const newUser = new User({image: img, description, date});
     newUser.save()
     .then(() => res.json('User added!'))
     .catch(err => res.status(400).json(err));
});

router.delete('/delete/:id', function (req, res) {
  User.findByIdAndDelete(req.params.id).then((users) => res.json(users)
)});
mongoose.set('useFindAndModify', false);
router.post('/updating/:id', function (req, res) {
  if(req.body.description === null && req.body.description == '') {
    res.send('No description found');
  } else {
    const description = req.body.description;
      if( description == null) {
        res.send('cannot be null');
      } else {
          User.findOneAndUpdate(req.params.id,{$set: {description}}, function (err, descrip) {
            if (err) return console.log(err,'errr')
                res.send(descrip);
          });
        }
      }
});

module.exports = router;
