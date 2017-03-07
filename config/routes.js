const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const trip = require('../controllers/trip');
const users = require('../controllers/users');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

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
  .post(trip.create);  // save the write new data

router.route('/trips/map')
  .get(trip.map);

router.route('/trips/new')
  .get(secureRoute, trip.new);   // render the write-new page

router.route('/trips/:id')
  .get(trip.show)
  .put(trip.update)
  .delete(trip.delete);

router.route('/trips/:id/edit')
  .get(trip.edit);


  //----------------------------------------
  // Users
router.route('/users') // users all
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .delete(users.delete);

router.route('/users/:id/edit')
  .get(users.edit)
  .put(registrations.update); // needed from users / edit

router.route('/upload/profile')
  .post(upload.single('image'), users.createImageProfile);
router.route('/upload/hero')
  .post(upload.single('image'), users.createImageHero);


router.all('*', (req, res) => res.notFound());

module.exports = router;
