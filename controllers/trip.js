const Trip = require('../models/trip');

function indexRoute(req, res) {
  Trip
  .find()
  .exec()
  .then((trips) => {
    res.render('trip/index', { trips });
  })
  .catch((err) => {
    res.status(500).end(err);
  });
}

function mapRoute(req, res) {
  res.render('trip/map');
}

function showRoute(req, res) {
  res.render('trip/show');
}

function newWriteRoute(req, res) {
  res.render('trip/new');
}

function newSaveRoute(req, res) {
  Trip
    .create(req.body)
    .then(() => {
      res.redirect('/trip');
    })
    .catch((err) => {
      res.badRequest(500, err);
      // res.status(500).end(err);
    });
}



// UPDATE
function editRoute(req, res) {
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if (!trip) return res.status(404).send('Not found');

      for(const field in req.body) {
        trip[field] = req.body[field];
      }
      return trip.save();
    })
    .then((trip) => {
      res.redirect(`/trip/${trip.id}`);
    })
    .catch((err) => res.status(500).end(err));
}







module.exports = {
  index: indexRoute,
  map: mapRoute,
  show: showRoute,
  newWrite: newWriteRoute,
  newSave: newSaveRoute,
  edit: editRoute
};
