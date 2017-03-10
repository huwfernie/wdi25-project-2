const User = require('../models/user');
const Trip = require('../models/trip');

function indexRoute(req, res) { // will eventually get rid of this
  User
  .find()
  .exec()
  .then((users) => {
    res.render('users/index', { users });
  })
  .catch((err) => res.badRequest(500, err));
}


function showRoute(req, res) {
  User
  .findById(req.params.id)
  .exec()
  .then((thisUser) => {
    if(!thisUser) return res.notFound();
    return Trip.find({ createdBy: thisUser.id })
    .then((trips) => {
      if(!trips) return res.notFound();
      res.render('users/show', { thisUser, trips });
    })
    .catch((err) => {
      res.badRequest(500, err);
    });
  });
}


function editRoute(req, res) {
  User
  .findById(req.params.id)
  .exec()
  .then((user) => {
    if(!user) return res.notFound();
    res.render('users/edit', { user } );
  })
  .catch((err) => {
    res.badRequest(500, err);
  });
}

function deleteRoute(req, res, next) {
  User
  .findById(req.params.id)
  .exec()
  .then((user) => {
    if(!user) res.notFound();
    return user.remove();
  })
  .then(() => res.redirect('/'))
  .catch(next);
}




function createImageProfileRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  // req.body = Object.assign({}, req.body);
  //
  // req.user.imageProfile.push(req.body);

  console.log(1);
  if(req.file) req.body.image = req.file.key;
  console.log(req.file);
  console.log(3);
  console.log(req.file.location);
  console.log(4);
  console.log(req.user);

  const file = req.file.location;
  const user = req.user;

  user.imageProfile = file;

  console.log(5);
  console.log(req.user);

  req.user
    .save()
    .then(() => res.redirect(`/users/${req.user.id}`))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}


function createImageHeroRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;
  const file = req.file.location;
  const user = req.user;
  user.imageHero = file;
  req.user
    .save()
    .then(() => res.redirect(`/users/${req.user.id}`))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  edit: editRoute,
  delete: deleteRoute,
  createImageProfile: createImageProfileRoute,
  createImageHero: createImageHeroRoute
};
