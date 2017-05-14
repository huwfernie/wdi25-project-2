const Trip = require('../models/trip');
const markdown = require( 'markdown' ).markdown;
//const showdown = require('showdown');


// Roll back to this if it breaks again!!!!!
// function indexRoute(req, res) {
//   if(req.query.q === '' || !req.query.q ) {
//     req.flash('alert', 'showing all trips');
//     Trip
//     .find()
//     .exec()
//     .then((trips) => {
//       if(!trips) return res.notFound();
//       res.render('trips/index', { trips });
//     });
//   } else {
//     req.flash('alert', `showing trips that match "${req.query.q}"`);
//     Trip
//     .find({ when: req.query.q.toLowerCase() })
//     .exec()
//     .then((trips) => {
//       if(!trips) return res.notFound();
//       res.render('trips/index', { trips });
//     })
//     .catch((err) => {
//       res.badRequest(500, err);
//     });
//   }
// }
function indexRoute(req, res) {
  if ((req.query.q === '' || !req.query.q) && (req.query.w === '' || !req.query.w)) {
    console.log('all trips');
    req.flash('alert', 'showing all trips');
    Trip
    .find()
    .exec()
    .then((trips) => {
      if(!trips) return res.notFound();
      res.render('trips/index', { trips });
    });
  } else {
    req.flash('alert', `showing trips that match "${req.query.q}" and "${req.query.w}"`);
    console.log(`showing trips that match "${req.query.q}" and "${req.query.w}"`);
    let trips = [];
    Trip
    .find({ where: req.query.w })
    .exec()
    .then((first) => {
      console.log(first.length);
      trips = trips.concat(first);
      console.log('now we have ', trips.length);
      Trip
      .find({ when: req.query.q.toLowerCase() })
      .exec()
      .then((when) => {
        console.log(when.length);
        trips = trips.concat(when);
        console.log('final count ', trips.length);
        if(!trips) return res.notFound();
        res.render('trips/index', { trips });
      });
    })
    .catch((err) => {
      res.badRequest(500, err);
    });
  }
}

function mapRoute(req, res) {
  if ((req.query.q === '' || !req.query.q) && (req.query.w === '' || !req.query.w)) {
    req.flash('alert', 'showing all trips');
    Trip
    .find()
    .exec()
    .then((trips) => {
      if(!trips) return res.notFound();
      res.render('trips/map', { trips });
    });
  } else {
    req.flash('alert', `showing trips that match "${req.query.q}" and "${req.query.w}"`);
    console.log(req.query.w);
    let trips = [];
    Trip
    .find({ when: req.query.q.toLowerCase() })
    .exec()
    .then((when) => {
      trips = trips.concat(when);
      Trip
      .find({ where: req.query.w.toLowerCase() })
      .exec()
      .then((where) => {
        trips = trips.concat(where);
        if(!trips) return res.notFound();
        res.render('trips/map', { trips });
      });
    })
    .catch((err) => {
      res.badRequest(500, err);
    });
  }
}

function showRoute(req, res)  {
  Trip
  .findById(req.params.id)
  .populate('createdBy')
  .exec()
  .then((trip) => {
    if(!trip) return res.notFound();
    trip.words = markdown.toHTML(trip.words);
    var showdown  = require('showdown'),
      converter = new showdown.Converter(),
      text      = '#hello, markdown!',
      html      = converter.makeHtml(text);
    // console.log('here');
    // console.log(trip);
    // console.log(trip.createdBy);
    res.render('trips/show', { trip, html });
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
  map: mapRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createImageHero: createImageHeroRoute,
  createImageGallery: createImageGalleryRoute
};
