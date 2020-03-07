const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  image: { 
      type: Schema.Types.Mixed, 
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;