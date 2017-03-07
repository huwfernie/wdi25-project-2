const Trip = require('../models/trip');
const User = require('../models/user');

function indexRoute(req, res) {
  Trip
  .find()
  .exec()
  .then((trips) => {
    res.render('trips/index', { trips });
  })
  .catch((err) => {
    res.badRequest(500, err);
  });
}

function mapRoute(req, res) {
  res.render('trips/map');
}

function showRoute(req, res)  {
  Trip
  .findById(req.params.id)
  .populate('createdBy')
  .exec()
  .then((trip) => {
    if(!trip) return res.notFound();
    console.log('here');
    console.log(trip);
    console.log(trip.createdBy);
    res.render('trips/show', { trip });
  })
  .catch((err) => {
    res.badRequest(500, err);
  });
}

// renders the page to write a new log entry
function newRoute(req, res) {
  res.render('trips/new');
}

// processes the save of the new log entry
function createRoute(req, res) {
  req.body.createdBy = req.user;
  Trip
    .create(req.body)
    .then(() => {
      res.redirect('/trips');
    })
    .catch((err) => {
      res.badRequest(500, err);
      // res.status(500).end(err);
    });
}

// UPDATE - updates a previous log entry
function updateRoute(req, res) {
  console.log('does it get this far?');
  Trip
    .findById(req.params.id)
    .exec()
    .then((trip) => {
      if (!trip) return res.badRequest(404, 'not found');

      for(const field in req.body) {
        trip[field] = req.body[field];
      }
      return trip.save();
    })
    .then(() => {
      res.redirect('/trips');
    })
    .catch((err) => res.badRequest(404, err));
}

// EDIT - renders trip/edit page with a single trip file
function editRoute(req, res) {
  Trip
  .findById(req.params.id)
  .exec()
  .then((trip) => {
    if(!trip) return res.badRequest(404, 'not found');
    res.render('trips/edit', { trip });
  })
  .catch((err) => {
    res.badRequest(500, err);
  });
}

// to delete a trip entry
function deleteRoute(req, res, next) {
  Trip
  .findById(req.params.id)
  .exec()
  .then((trip) => {
    if(!trip) return res.badRequest(404, 'not found');
    return trip.remove();
  })
  .then(() => res.redirect('/trips'))
  .catch(next);
}


module.exports = {
  index: indexRoute,
  map: mapRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
