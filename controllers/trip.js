const Trip = require('../models/trip');
//const User = require('../models/user');

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
  Trip
  .find()
  .exec()
  .then((trips) => {
    res.render('trips/map', { trips });
  })
  .catch((err) => {
    res.badRequest(500, err);
  });
}

function showRoute(req, res)  {
  Trip
  .findById(req.params.id)
  .populate('createdBy')
  .exec()
  .then((trip) => {
    if(!trip) return res.notFound();
    // console.log('here');
    // console.log(trip);
    // console.log(trip.createdBy);
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
  //console.log('does it get this far?');
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
    if(!trip) return res.notFound();
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

function createImageHeroRoute(req, res, next) {
  Trip
  .findById(req.params.id)
  .exec()
  .then((trip) => {
    if(!trip) return res.notFound();
    if(req.file) req.body.image = req.file.key;
    const file = req.file.location;
    // console.log(file);
    // console.log(trip);
    trip.imageHero = file;
    trip
    .save()
    .then(() => res.redirect(`/trips/${req.params.id}`));
  })
  .catch((err) => {
    //console.log(err);
    if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
    next(err);

  });
}

function createImageGalleryRoute(req, res, next) {
  Trip
  .findById(req.params.id)
  .exec()
  .then((trip) => {
    if(!trip) return res.notFound();
    if(req.file) req.body.image = req.file.key;
    const file = req.file.location;
    // console.log(file);
    // console.log(trip);
    trip.imageGallery.push(file);
    trip
    .save()
    .then(() => res.redirect(`/trips/${req.params.id}`));
  })
  .catch((err) => {
    //console.log(err);
    if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
    next(err);

  });
}

module.exports = {
  index: indexRoute,
  map: mapRoute,// what should this be called??
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createImageHero: createImageHeroRoute, // this too?
  createImageGallery: createImageGalleryRoute // this too?
};
