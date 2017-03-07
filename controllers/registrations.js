const User = require('../models/user');

// function newRoute(req, res) {
//   return res.render('sessions/new'); // this will never be used - grow some balls and delete it!
// }

// CREATE a new user
function createRoute(req, res, next) {
  User
  .create(req.body)
  .then((user) => {
    req.session.userId = user.id;
    req.session.isAuthenticated = true;
    req.user = user;

    req.flash('success', `Welcome back, ${user.username}!`);
    res.redirect(`/users/${user.id}`);
  })
  .catch((err) => {
    if(err.name === 'ValidationError') {
      req.flash('alert', 'Passwords do not match');
      return res.redirect('/');
    }
    next();
  });
}

// UPDATE
function updateRoute(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user) return res.badRequest(404, 'not found');

      for(const field in req.body) {
        user[field] = req.body[field];
      }
      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch((err) => res.badRequest(500, err));
}

module.exports = {
  // new: newRoute,
  create: createRoute,
  update: updateRoute
};
