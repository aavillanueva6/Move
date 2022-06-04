const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {},
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

// socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const users = [];
io.on('connection', (socket) => {
  // socket.on('user_join', (data) => {
  const userID = Math.random();
  const socketID = socket.id;
  const newUser = {
    socketID,
    userID,
  };
  users.push(newUser);
  console.log(users);
  // });
  console.log('a user connected');
  socket.broadcast.emit('hi');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log(`message: ${msg} from: ${socketID}`);
    io.emit('chat message', msg);
  });
});

// sequelize.sync({ force: false }).then(() => {
server.listen(PORT, () => console.log(`Now listening at localhost:${PORT}`));
// });
