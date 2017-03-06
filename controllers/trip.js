function indexRoute(req, res) {
  res.render('trip/index');
}

function mapRoute(req, res) {
  res.render('trip/map');
}

function showRoute(req, res) {
  res.render('trip/show');
}

function newRoute(req, res) {
  res.render('trip/new');
}

function editRoute(req, res) {
  res.render('trip/edit');
}

module.exports = {
  index: indexRoute,
  map: mapRoute,
  show: showRoute,
  new: newRoute,
  edit: editRoute
};
