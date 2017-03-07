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
  new: newRoute,
  create: createRoute,
  update: updateRoute
};
