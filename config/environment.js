// it would take the port number from the zshrc file - heroku will choose one, or
// if none chosen it will run on port 3000.
const port = process.env.PORT || 3000;
const env = process.env.NDE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/project-2-${env}`;
const sessionSecret = process.env.SESSION_SECRET || 'my awesome secret';

module.exports = { port, env, dbURI, sessionSecret };
