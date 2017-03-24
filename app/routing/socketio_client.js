//import io from 'socket.io';
export default (io) => {
  io.on('connection', (socket) => {
    socket = leaveAllRooms(Object.keys(io.sockets.adapter.sids[socket.id]), socket);

    socket.join('Room 1');
    // sendConnectionMessage(getRoom(socket, socket.id), socket);
    socket.nickname = Math.floor(Math.random()*100);
    
    socket.on('chat message', (msg) => {
      var nickname = socket.nickname;
      console.log('socket id ' + socket.id);
      console.log('socket username ' + nickname);
      io.to(getRoom(socket, io)).emit('chat message', nickname + ': ' + msg);
    });

    socket.on('keypress', (msg) => {
      if (msg) {
        socket.to(getRoom(socket, io)).broadcast.emit('keypress', socket.nickname);
      } else if (!msg) {
        socket.to(getRoom(socket, io)).broadcast.emit('keypress', false);
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

  // export default io;
}