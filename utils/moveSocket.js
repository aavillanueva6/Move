const createAnonUser = require('../public/js/randomName');

// storage of messages to persist over page load
const { Message, User } = require('../models/index');
const { Op } = require('sequelize');

function moveSocket(io, sequelize, datetime) {
  io.on('connection', async (socket) => {
    console.log('a user connected');

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

      dbMessagesData.forEach;
    }
    const sessionCookie = socket.handshake.headers.cookie;
    const actual = sessionCookie.split('=')[1].split('.')[0].split('');
    actual.splice(0, 4);
    const SessionCookieID = actual.join('');
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

    socket.broadcast.emit('hi');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg, sentPage) => {
      console.log(`message: ${msg} from: ${userID}`);
      io.emit('chat message', msg, userID, sentPage);
      currentTime = datetime.create().now();
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
