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

function showRoute(req, res)  {
  Trip
  .findById(req.params.id)
  .exec()
  .then((trip) => {
    if(!trip) return res.status(404).end('not found');
    res.render('trip/show', { trip });
  })
  .catch((err) => {
    res.status(500).end(err);
  });
}

// renders the page to write a new log entry
function newWriteRoute(req, res) {
  console.log('DID WE GET HERE');
  res.render('trip/new');
}

// processes the save of the new log entry
function newSaveRoute(req, res) {
  console.log('or here');
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
    .then((trip) => {
      res.redirect(`/trip/${trip.id}`);
    })
    .catch((err) => res.badRequest(404, err));
}

// UPDATE
// function editRoute(req, res) {
//   Trip
//     .findById(req.params.id)
//     .exec()
//     .then((trip) => {
//       if (!trip) return res.badRequest(404, 'not found');
//
//       for(const field in req.body) {
//         trip[field] = req.body[field];
//       }
//       return trip.save();
//     })
//     .then((trip) => {
//       res.redirect(`/trip/${trip.id}`);
//     })
//     .catch((err) => res.status(500).end(err));
// }


// EDIT - renders trip/edit with a single trip file
function editRoute(req, res) {
  Trip
  .findById(req.params.id)
  .exec()
  .then((trip) => {
    if(!trip) return res.badRequest(404, 'not found');
    res.render('trip/edit', { trip });
  })
  .catch((err) => {
    res.badRequest(500, err);
  });
}




module.exports = {
  index: indexRoute,
  map: mapRoute,
  show: showRoute,
  newWrite: newWriteRoute,
  newSave: newSaveRoute,
  edit: editRoute,
  update: updateRoute
};
