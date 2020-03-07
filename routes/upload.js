const router = require('express').Router();
const Gallery = require('../models/gallery');
const mongoose = require('mongoose');
router.get('/',(req, res) => {
  Gallery.find()
    .then(Gallery => res.json(Gallery))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/images',(req, res) => {
  const img = req.body.image;
  const description = req.body.description;
  const date = req.body.date;
  const newGallery = new Gallery({image: img, description, date});
     newGallery.save()
     .then(() => res.json('Gallery added!'))
     .catch(err => res.status(400).json(err));
});

router.delete('/delete/:id', function (req, res) {
  Gallery.findByIdAndDelete(req.params.id).then((gallery) => res.json(gallery)
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
          User.findOneAndUpdate(req.params.id,{$set: {description}}, function (err, description) {
            if (err) return console.log(err,'errr')
                res.send(description);
          });
        }
      }
});

module.exports = router;
