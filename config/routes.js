const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const trip = require('../controllers/trip');
const users = require('../controllers/users');
const upload = require('../lib/upload');
const oauth = require('../controllers/oauth');
const statics = require('../controllers/statics');

router.route('/')
  .get(statics.index);

router.route('/register')
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


//----------------------------------------
// Trips
router.route('/trips')
  .get(trip.index)
  .post(secureRoute, trip.create);  // save the write new data

router.route('/trips/map')
  .get(trip.map);

router.route('/trips/new')
  .get(secureRoute, trip.new);   // render the write-new page

router.route('/trips/:id')
  .get(trip.show)
  .put(secureRoute, trip.update)
  .delete(secureRoute, trip.delete);

router.route('/trips/:id/edit')
  .get(secureRoute, trip.edit)
  .post(secureRoute, upload.single('image'), trip.createImageHero);

router.route('/trips/:id/editGallery')
  .post(secureRoute, upload.single('image'), trip.createImageGallery);


//----------------------------------------
// Users
router.route('/users') // users all
  .get(users.index);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .delete(secureRoute, users.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit)
  .put(secureRoute, registrations.update); // needed from users / edit

router.route('/upload/profile')
  .post(secureRoute, upload.single('image'), users.createImageProfile);
router.route('/upload/hero')
  .post(secureRoute, upload.single('image'), users.createImageHero);


//----------------------------------------
// oAuth
router.route('/oauth/github')
  .get(oauth.github);

router.route('/oauth/twitter')
  .get(oauth.twitter);

router.all('*', (req, res) => res.notFound());

module.exports = router;
