//import io from 'socket.io';
import parseJSON from './parse_json';
import Hangout from '../models/hangout';
import User from '../models/user';

export default (io) => {
  io.on('connection', (socket) => {
    socket = leaveAllRooms(Object.keys(io.sockets.adapter.sids[socket.id]), socket);

    socket.join('default');
    socket.on('init', (userObject) => {
      socket.nickname = userObject.given_name;

      //This is for initially joining the room
      let i = 0;
      while (userObject.hangouts[i] && !userObject.hangouts[i].second_person) {
        i++;
      }
      var room = (userObject.hangouts[i]) ? userObject.hangouts[i]._id : 'default';
      console.log('joined: ', room);
      socket.join(room);
    })
    
    /**
     * @param {object} messageObject
     * Format: { 'room': roomID, 'message': <msg text here> }
     * Handle timestamps on server
     * Handle socket ID on server
     */
    socket.on('chat message', (messageObject) => {
      var room = getRoom(socket, io);
      var nickname = socket.nickname;
      console.log('room', room);

      io.to(room).emit('chat message', messageObject.given_name + ': ' + messageObject.message);

      // DUPE #1: Hangout Object
      Hangout.findById(room, function (err, foundHangout) {
        if (err || !foundHangout) return err;

        //Unshift is used for future lazy loading
        foundHangout.chat.unshift(messageObject);
        foundHangout.save(function (err) {
          if (err) return err;
        })

        var receivingUser = (foundHangout.first_person === messageObject.fbToken) ? foundHangout.second_person : foundHangout.first_person;
          
        // DUPE #2: Finding the Receiving User
        User.findOne({ 'fbToken': receivingUser }, function (err, foundUser) {
          console.log('recfounduser', foundUser);
          if (err) return err;
          

          for (var i = 0; i < foundUser.hangouts.length; i++) {
            
            if (foundUser.hangouts[i]._id == room) {
              foundUser.hangouts[i].chat.unshift(messageObject);
              console.log('rec', foundUser.hangouts[i].chat);
              foundUser.save(function (err) {
                console.log('Saved 1!');
                if (err) return err;
              })
            };
          }
        });

        // DUPE #3: Finding the Sending User and saving it
        User.findOne({ 'fbToken': messageObject.fbToken }, function (err, foundUser) {
          if (err) return err;
          for (var i = 0; i < foundUser.hangouts.length; i++) {
            if (foundUser.hangouts[i]._id == room) {
              foundUser.hangouts[i].chat.unshift(messageObject);
              foundUser.save(function (err) {
                if (err) return err;
              })
            };

          }
        });
      })

    });

    socket.on('keypress', (messageObject) => {
      if (messageObject.message) {
        socket.to(getRoom(socket, io)).broadcast.emit('keypress', socket.nickname);
      } else if (!messageObject.message) {
        socket.to(getRoom(socket, io)).broadcast.emit('keypress', messageObject.message);
      }
    });

    // Future Proofing
    socket.on('disconnect', (data) => {

    });

    socket.on('changeRoom', (data) => {
      if (data.roomName === getRoom(socket, io)) return;
      socket = leaveAllRooms(Object.keys(io.sockets.adapter.sids[socket.id]), socket);
      socket.join(data.roomName);
    });

    // Future Proofing. Just in case. Not used at all.
    socket.on('changeUserName', (data) => {
      socket.nickname = data.userName;
    });
  });
}

function leaveAllRooms(roomArray, socket) {
  for (var i = 0; i < roomArray.length; i++) {
    socket.leave(roomArray[i]);
  }
  return socket;
}

function sendDisconnectionMessage(roomItem, socket) {
  socket.broadcast.to(roomItem).emit('chat message', socket.nickname + ' has disconnected!');
}

function sendConnectionMessage(room, socket) {
  socket.broadcast.to(room).emit('chat message', socket.nickname + ' has connected')
}

function getRoom(socket, io) {
  return Object.keys(io.sockets.adapter.sids[socket.id])[0];
}

function getDate() {
  var newDate = new Date();
  var fullDate = newDate.getFullYear().toString();
  
  if (newDate.getMonth() + 1 < 10) {
    fullDate += 0;
  }
  fullDate += (newDate.getMonth() + 1).toString();

  if (newDate.getDate() < 10) {
    fullDate += 0;
  }
  fullDate += (newDate.getDate() + 1).toString();
  
  console.log('fullDate: ' + fullDate);
  return fullDate;
}