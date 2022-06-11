const createAnonUser = require('../public/js/randomName');

// storage of messages to persist over page load
const { Message, User } = require('../models/index');
const { Op } = require('sequelize');

function moveSocket(io, sequelize, datetime) {
  io.on('connection', async (socket) => {
    console.log('a user connected');

    // upon user connection, query database to delete chat messages that are past the expiry
    const connectionTime = datetime.create().now();
    const expirationHours = 0.1; // set this to the number of hours before the messages are deleted from the db
    const expirationTime = connectionTime - 1000 * 60 * 60 * expirationHours;
    const deletedMessages = Message.destroy({
      where: {
        date_created: {
          [Op.lt]: expirationTime,
        },
      },
    });

    // query the db to find all chat messages
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

    // if there are messages found in the db, loop through each message and emit the message to the chat client
    if (dbMessagesData) {
      dbMessagesData.forEach((element) => {
        // if the message does not have a user associated with it, assign an anonymous name to the message.
        if (!element.user.username) {
          element.user.username = createAnonUser();
        }
        const msg = element.message_body;
        const userID = element.user.username;
        const sentPage = element.sent_page;
        socket.emit('chat message', msg, userID, sentPage);
      });
    }

    // parses the session cookie off of the http request and uses that value to query the database to identify if the user is logged.
    const sessionCookie = socket.handshake.headers.cookie;
    const actual = sessionCookie.split('=')[1].split('.')[0].split('');
    actual.splice(0, 4);
    const SessionCookieID = actual.join('');
    let sessionString = 'sessions';
    if (process.env.JAWSDB_URL) {
      sessionString = 'Sessions';
    }
    let logged_in;
    let userID = '';
    let loggedInUser;
    let loggedInUserName = '';
    try {
      const sessionQueryData = await sequelize.query(
        `SELECT * FROM ${sessionString} WHERE sid='${SessionCookieID}'`,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );

      const cookieJsonData = sessionQueryData[0][0].data;
      parsedCookieData = JSON.parse(cookieJsonData);
      logged_in = parsedCookieData.logged_in;
      loggedInUser = parsedCookieData.user_id;

      // if the user is logged in query the database to pull their username
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

      //set the user's ID to their username if they are logged in, or an anoymous name if they are not logged in
      if (logged_in) {
        // set userID to logged in user's name
        userID = loggedInUserName;
      } else {
        userID = createAnonUser();
      }

      // const socketID = socket.id;
      // const newUser = {
      //   socketID,
      //   userID,
      // };
    } catch (err) {
      console.log(err);
    }

    socket.broadcast.emit('hi');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    // when a client sends a chat, the server adds the userID and then emits the message to all clients.  It also adds the message to the database
    socket.on('chat message', (msg, sentPage) => {
      console.log(`message: ${msg} from: ${userID}`);
      io.emit('chat message', msg, userID, sentPage);
      const currentTime = datetime.create().now();
      const messageData = Message.create({
        message_body: msg,
        sent_page: sentPage,
        user_id: loggedInUser,
        date_created: currentTime,
      });
    });
  });
}

module.exports = moveSocket;
