function indexRoute(req, res) {
  res.render('users/all');
}

function showRoute(req, res) {
  res.render('users/show');
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
