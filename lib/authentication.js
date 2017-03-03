const User = require('../models/user');

function authentication(req, res, next) {
  //check to see if user is logged in
  //if not exit this piece of middleware
  if(!req.session.isAuthenticated) return next();

  // find user based on the user.id in the session
  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        // if the user cannot be found then log out the user
        return req.session.regenerate(() => res.unauthorized());
      }

      // set the user id back to the session
      req.session.userId = user.id;

      //set the whole user object to the request object
      //so we can use the users details in our controllers
      req.user = user;

      // put the user id on the locals object.
      //so we can use it in views.
      res.locals.user = user;

      // update the isAuthenticated value on the locals object- it's boolian
      // so we can show  or hide buttons and stuff.
      res.locals.isAuthenticated = true;

      // ok, move on to the next piece of middleware
      next();
    })
    .catch(next); //handle any errors with global error handler
}


module.exports = authentication;
