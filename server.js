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
const io = new Server(server);
const createAnonUser = require('./public/js/randomName');

// storage of messages to persist over page load
const { InMemoryMessageStore } = require('./utils/messageStore');
const messageStore = new InMemoryMessageStore();
const { Message, User } = require('./models/index');
const { Op } = require('sequelize');

io.use(async (socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  console.log('sessionID', sessionID);
  socket.sessionID = 'sessionIDFromServer';
  socket.userID = 'userIDFromServer';
  socket.username = 'paul';
  next();
});

const users = [];
io.on('connection', async (socket) => {
  console.log('a user connected');

  const dbMessagesData = await Message.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
    raw: true,
    nest: true,
  });

  if (dbMessagesData) {
    dbMessagesData.forEach((element) => {
      if (!element.user.username) {
        element.user.username = createAnonUser();
      }
      const msg = element.message_body;
      const userID = element.user.username;
      const sentPage = element.sent_page;
      socket.emit('chat message', msg, userID, sentPage);
    });
    console.log(dbMessagesData);

    dbMessagesData.forEach;
  }
  const sessionCookie = socket.handshake.headers.cookie;
  console.log('Session Cookie ', sessionCookie);
  const actual = sessionCookie.split('=')[1].split('.')[0].split('');
  actual.splice(0, 4);
  const SessionCookieID = actual.join('');
  console.log(SessionCookieID);
  const sessionQueryData = await sequelize.query(
    `SELECT * FROM sessions WHERE sid='${SessionCookieID}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
  // console.log('session Query Data: ',sessionQueryData);

  const cookieJsonData = sessionQueryData[0][0].data;

  parsedCookieData = JSON.parse(cookieJsonData);

  const logged_in = parsedCookieData.logged_in;

  const loggedInUser = parsedCookieData.user_id;
  let loggedInUserName = '';
  if (logged_in) {
    const userQueryData = await sequelize.query(
      `SELECT * FROM user WHERE id=${loggedInUser}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );

    loggedInUserName = userQueryData[0][0].username;
  }

  socket.emit('session', {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  let userID = '';

  if (logged_in) {
    // set userID to logged in user's name
    userID = loggedInUserName;
  } else {
    userID = createAnonUser();
  }
  const socketID = socket.id;
  const newUser = {
    socketID,
    userID,
  };
  users.push(newUser);
  console.log(`user list`);
  console.log(users);

  socket.broadcast.emit('hi');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg, sentPage) => {
    console.log(`message: ${msg} from: ${userID}`);
    io.emit('chat message', msg, userID, sentPage);
    currentTime = datetime.create().now();
    messageStore.saveMessage({ msg, sentPage, userID, currentTime });
    console.log(messageStore);
    const messageData = Message.create({
      message_body: msg,
      sent_page: sentPage,
      user_id: loggedInUser,
      date_created: currentTime,
    });
    const expirationHours = 0.1; // set this to the number of hours before the messages are deleted from the db
    const expirationTime = currentTime - 1000 * 60 * 60 * expirationHours;
    // console.log(currentTime, expirationTime);
    const deletedMessages = Message.destroy({
      where: {
        date_created: {
          [Op.lt]: expirationTime,
        },
      },
    });
  });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening at localhost:${PORT}`));
});
