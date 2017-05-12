const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Trip = require('../models/trip');

// User.collection.drop();
// Trip.collection.drop();


User
  .create([{
    username: 'Huw',
    email: 'h@h',
    password: 'p',
    passwordConfirmation: 'p',
    imageProfile: 'http://www.falmouthpacket.co.uk/resources/images/3622159/',
    imageHero: 'http://media.bizj.us/view/img/9307902/aaaaboat1*750xx2448-1377-0-536.jpg',
    nearestAirport: 'London',
    favourites: [],
    bio: 'I used to be a sailor, now I am a web developer, it is fun',
    githubId: null
  }, {
    username: 'Roser',
    email: 'r@r',
    password: 'p',
    passwordConfirmation: 'p',
    imageProfile: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/085/189/10526f6.jpg',
    imageHero: 'https://i2.wp.com/segelreporter.com/wp-content/uploads/2014/07/Arti_Roser.jpg?fit=640%2C300',
    nearestAirport: 'London',
    favourites: [],
    bio: 'I used to be a sailor, now I am not, it is also fun',
    githubId: null
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Trip
      .create([{
        title: 'Huws Seeded Trip',
        words: 'We went on a trip to seedsville',
        when: 'Summer', // Summer or Winter
        where: 'London',
        who: { adults: 2, children: 0 },
        how: 'Bicycle',
        for: 3, // of days
        createdBy: users[0],
        authorImage: null, //users[0].authorImage,
        legs: null,//[ legSchema ],
        lat: 51.5,
        long: -0.12,
        imageHero: 'https://media.timeout.com/images/101651783/image.jpg',
        imageGallery: []
      }, {
        title: 'Rosers Seeded Trip',
        words: 'We went on a trip to seedsville',
        when: 'Summer', // Summer or Winter
        where: 'London',
        who: { adults: 2, children: 0 },
        how: 'Bicycle',
        for: 2, // of days
        createdBy: users[1],
        authorImage: null, //users[0].authorImage,
        legs: null,//[ legSchema ],
        lat: 51.5,
        long: -0.12,
        imageHero: 'https://media.timeout.com/images/101651783/image.jpg',
        imageGallery: []
      }]);
  })
  .then((trips) => {
    console.log(`${trips.length} trips created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
