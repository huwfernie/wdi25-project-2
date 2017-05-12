**
git push heroku master
heroku run node db/seeds
**

This is a searchable blogging site, it needs a MongoDB database to work


clone the repo from GIT

navigate to the directory in your terminal and run:

$ NPM install

You'll need MongoDB installed, then:

run $ mongod from another tab in the terminal


back in the first terminal tab, after the Node packages have been installed:

populate the database by running:

$ node db/seeds

then run:

$ gulp

If that all works then you should be able to:

Open browser and navigate to `http//:localhost:3000`
