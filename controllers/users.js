function indexRoute(req, res) {
  res.render('users/all');
}

function showRoute(req, res) {
  res.render('users/show');
}

function createImageRoute(req, res, next) {
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
    .then(() => res.redirect('/users/:id'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}


// function bedTimeRoute(req, res) {
//   console.log(1);
//   if(req.file) req.body.image = req.file.key;
//   console.log(req.file);
//   console.log(3);
//   console.log(req.file.location);
//   console.log(4);
//   console.log(req.user);
//
//   let file = req.file.location;
//   let user = req.user;
//
//   return res.render('users/show', { file, user });
//   //here we put code to upload into the user object model
//
// }


module.exports = {
  index: indexRoute,
  show: showRoute,
  createImage: createImageRoute
};
