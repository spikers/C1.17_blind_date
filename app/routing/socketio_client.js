//import io from 'socket.io';
import parseJSON from './parse_json';

export default (io) => {
  io.on('connection', (socket) => {
    socket = leaveAllRooms(Object.keys(io.sockets.adapter.sids[socket.id]), socket);

    socket.join('Room 1');
    socket.nickname = Math.floor(Math.random()*100);
    
    /**
     * @param {object} messageObject
     * Format: { 'room': roomID, 'message': <msg text here> }
     * Handle timestamps on server
     * Handle socket ID on server
     */
    socket.on('chat message', (messageObject) => {
      var nickname = socket.nickname;
      console.log(messageObject);

      io.to(getRoom(socket, io)).emit('chat message', nickname + ': ' + messageObject.message);
    });

    socket.on('keypress', (messageObject) => {
      if (messageObject.message) {
        socket.to(messageObject.room).broadcast.emit('keypress', socket.nickname);
      } else if (!messageObject.message) {
        socket.to(messageObject.room).broadcast.emit('keypress', messageObject.message);
      }
    });

    socket.on('disconnect', (data) => {
      console.log('roomname');
      //sendDisconnectionMessage(data.roomName, socket);
    });

    socket.on('changeRoom', (data) => {
      console.log('changeroom called', data.roomName);
      console.log('data' + data.roomName);
      console.log('sid' + Object.keys(io.sockets.adapter.sids[socket.id])[0]);

      if (data.roomName === getRoom(socket, io)) return;

      socket = leaveAllRooms(Object.keys(io.sockets.adapter.sids[socket.id]), socket);

      socket.join(data.roomName);
      sendConnectionMessage(data.roomName, socket);

      // console.log('clients tim=  ', io.sockets.adapter.rooms);
      // console.log('rooms of user=', Object.keys(io.sockets.adapter.sids[socket.id]))
    });

    socket.on('changeUserName', (data) => {
      console.log('changeuser called', data.userName);
      console.log(socket.conn.id);
      socket.nickname = data.userName;
    });
  });
}

function leaveAllRooms(roomArray, socket) {
  for (var i = 0; i < roomArray.length; i++) {
    socket.leave(roomArray[i]);
    sendDisconnectionMessage(roomArray[i], socket);
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
  
  // This is 0-indexed. So September is 8, November is 9. November should not have a leading 0
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