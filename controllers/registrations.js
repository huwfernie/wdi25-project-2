const User = require('../models/user');

function newRoute(req, res) {
  return res.render('sessions/new'); // this will never be used - grow some balls and delete it!
}

function createRoute(req, res, next) {
  User
    .create(req.body)
    .then(() => res.redirect('/users'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        req.flash('alert', 'Passwords do not match');
        return res.redirect('/');
      }
      next();
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
