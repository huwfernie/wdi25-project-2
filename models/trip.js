const mongoose = require('mongoose');

const legSchema = new mongoose.Schema({
  images: String,
  words: String,
  when: String,
  where: String
  // who: { adults: Number, childred: Number},
  // how: String,
  // for: Number
});
//
// const tripSchema = new mongoose.Schema({
//   title: {type: String, required: true  },
//   imageHero: {type: String },
//   images: String,
//   season: String,
//   date: String,
//   duration: Number,
//   group: { adults: Number, childred: Number},
//   cost: String,
//   startLocation: String,
//   endLocation: String,
//   method: String,
//   favourites: [],
//   // embeded leg report
//   leg: [ legSchema ]
// });

const tripSchema = new mongoose.Schema({
  title: String,
  words: String,
  when: String, // Summer or Winter
  where: String,
  who: { adults: Number, children: Number },
  how: String,
  for: Number,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  authorImage: { type: mongoose.Schema.ObjectId, ref: 'User' },
  legs: [ legSchema ],
  lat: Number,
  long: Number,
  imageHero: String,
  imageGallery: []
},{
  timestamps: true
});

//'Trip' specifies the collection where each trip is stored.
module.exports = mongoose.model('Trip', tripSchema);
