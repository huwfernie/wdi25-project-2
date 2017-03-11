
const Trip = require('../models/trip');
//
// function indexRoute(req, res) {
//   Trip
//   .find()
//   .limit(3)
//   .exec()
//   .then((trips) => {
//     const imageArray = trips.map((trip) => {
//       return trip.imageHero;
//     });
//     res.render('statics/index', { imageArray });
//   });
// }
function indexRoute(req, res) {
  Trip
  .find({ imageHero: { $exists: true } })
  .populate('createdBy')
  .sort({ '_id': -1})
  .limit(3)
  .exec()
  .then((trips) => {
    res.render('statics/index', { trips });
  });
}


module.exports = {
  index: indexRoute
};
