const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const datetime = require('node-datetime');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const hour = 1000 * 60 * 60;

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {
    maxAge: hour * 24,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// TODO: this is only in for development of socket.io.  Need to remove from server.js prior to deployment
app.get('/socketTest', (req, res) => {
  res.sendFile(__dirname + '/public/dev/');
});
app.get('/socketTest/test2', (req, res) => {
  res.sendFile(__dirname + '/public/dev/');
});
app.get('/test3/socketTest', (req, res) => {
  res.sendFile(__dirname + '/public/dev/');
});
// the following route was added to test messaging at the home page.  In order to run this test, "app.use(routes)" should be commented out above.
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/dev/');
// });
// TODO: remove the above lines when ready to deploy

// socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const moveSocket = require('./utils/moveSocket');
const io = new Server(server);

moveSocket(io, sequelize, datetime);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening at localhost:${PORT}`));
});
