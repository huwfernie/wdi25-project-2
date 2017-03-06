const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
//const secureRoute = require('../lib/secureRoute');
const trip = require('../controllers/trip');
const users = require('../controllers/users');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/register')
  .get(registrations.new) // not needed now that the both forms are on the same page
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/trip')
  .get(trip.index);

router.route('/trip/map')
  .get(trip.map);

router.route('/trip/show')
  .get(trip.show)
  .put(trip.edit);

router.route('/trip/new')
  .get(trip.newWrite)
  .post(trip.newSave);

// router.route('/trip/edit')
//   .get(trip.edit);

router.route('/users') // users all
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(registrations.update);
//  .post(upload.single('image'), users.createImage);

router.route('/upload/profile')
  .post(upload.single('image'), users.createImageProfile);
router.route('/upload/hero')
  .post(upload.single('image'), users.createImageHero);


router.all('*', (req, res) => res.notFound());

module.exports = router;
