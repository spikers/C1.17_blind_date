var socket = io();

window.addEventListener('load', function () {
    $.ajax({
        url: "http://localhost:8000/api/user/" + getFbToken(),
        type: "GET",
        dataType: "json",
        success: function (userObject) {
            socket.emit('init', userObject);
            createButton(userObject);
            initialize(userObject);
        }
    });
});
function chatHistory(chat) {
    for(var j=chat.length-1; j>=0; j--){
        var msg = chat[j].given_name + ': ' + chat[j].message;
        $('#messages').append($('<li>').append(msg));
    }
}
function getName(fbToken, hangoutData){
  if (!fbToken) return;

  $.ajax({
      url: "http://localhost:8000/api/user/" + fbToken,
      type: "GET",
      dataType: "json",
      success: function (data) {

        var hod = hangoutData;
        var name = data.given_name;

        var button = $('<button>');
        $('#room-container').append(button.append(name));
        var cData = hod.chat;

        button.click(function () {
          socket.emit('changeRoom', { roomName: hod._id });
          $.ajax({
            url: "http://localhost:8000/api/user/" + fbToken,
            type: "GET",
            dataType: "json",
            success: function (data) {
              $('#messages').empty();

              for (let i = 0; i < data.hangouts.length; i++) {
                if (data.hangouts[i]._id == hod._id) {
                  chatHistory(data.hangouts[i].chat)
                  break;
                }
              }


            }})
        });
      }
  });
}
function createButton(data){
    for(var i = 0; i<data.hangouts.length; i++){
        (function () {
            var chatData = data.hangouts[i].chat;

            if(data.fbToken === data.hangouts[i].first_person){
                var match = data.hangouts[i].second_person;
                getName(match, data.hangouts[i]);
            }else{
                var match = data.hangouts[i].first_person;
                getName(match, data.hangouts[i]);
            }
        })();
    }
}

function initialize(userObject) {
  var name = '';
  var room = userObject.hangouts[0]._id;

  for (let i = 0; i < userObject.hangouts.length; i++) {
    if (userObject.hangouts[i].second_person) {
      socket.emit('changeRoom', {roomName: userObject.hangouts[i]._id});
      chatHistory(userObject.hangouts[i].chat);
      i = userObject.hangouts.length;
    }
  }

  var form = document.getElementById('form');

  form.addEventListener('submit', function (e) {
    submitMessage(e, socket, room, userObject);
  });

  socket.on('chat message', function (msg) {
    ulElement = document.getElementById('messages');
    var li = getElementFromText(msg, 'li');
    ulElement.appendChild(li);
    ulElement.scrollTop = ulElement.scrollHeight;
  });

  socket.on('join', function (room) {
    socket.room = room;
    socket.join(room);
  })

  document.getElementById('input').addEventListener('input', function (e) {
    if (document.getElementById('input').value) {
      socket.emit('keypress', { message: true });
    } else if (document.getElementById('input').value === '') {
      socket.emit('keypress', { message: false });
    }
  })

  socket.on('keypress', function (nickname) {
    var typing = document.getElementById('typing');
    if (nickname) {
      typing.textContent = nickname + ' is typing';
    } else if (!nickname) {
      typing.textContent = '';
    }
  });
}

function submitMessage(e, socket, room, userObject) {
  e.preventDefault();
  if (document.getElementById('input').value === '') return;
  var message = document.getElementById('input').value;
  socket.emit('chat message', { 
    given_name: userObject.given_name, 
    fbToken: userObject.fbToken, 
    message: message 
  });
  document.getElementById('input').value = '';
  socket.emit('keypress', { message: false });
  return false;
}

function getElementFromText(text, type) {
  var tn = document.createTextNode(text);
  var element = document.createElement(type);
  element.appendChild(tn);
  return element;
}

function addChatToPage(userObject, socket) {
  var roomContainer = document.getElementById('room-container');
  for (var i = 0; i < userObject.hangouts.length; i++) {
    (function () {
      if (!userObject.hangouts[i].second_person) return;

      var hangout = userObject.hangouts[i];

      var chatId = hangout._id;
    }())
  }
}

function getFbToken() {
  var url = window.location.href;
  if (url.indexOf('=') === -1) return '111082239432346';
  var qs = url.slice(url.lastIndexOf('=') + 1);
  return qs;
}