
var cssloader = require('./lib/cssloader'),

    dom = require('./extlib/uki-core/dom'),
    find  = require("./extlib/uki-core/selector").find,
    builder = require('./extlib/uki-core/builder').build,

    views = require('./view/views'),
    
    constants = require('./secure/constants'),
    ytdata = require('./lib/ytdata'),
    ytplayer = require('./lib/ytplayer');

(function() {
  FB.init({
    appId: constants.DEV_FB_APP_ID,
    status: false,
    cookie: true,
    xfbml: false,
    oauth: true
  });

  FB.getLoginStatus(function(r) {
    if (r.authResponse || r.session) {
      startApp();
      handleMessages();
    } else {
      location.href = './login.html';
    }
  }, true);
})();

// --- App startup

window.startApp = function() {
  ytdata.search('Ellie Goulding', function(results) {
    // DEBUG
    results.forEach(function(result) {
      console.log('title: ', result.title);
      console.log('url: ', result.embedurl);
    });
    ytplayer.makePlayer(results[0].embedurl);
  });
  builder([
    { view: 'Searchlist', rect: '0 0 300 200', anchors: 'left top', background: 'theme(panel)' }
  ]).attach(document.getElementById('searcher'));
};

window.onYouTubePlayerReady = function() {
  var player = document.getElementById('ytplayer');
  player && player.pauseVideo();
};

window.handleMessages=function(){
  var socket = io.connect('http://localhost:8080');
  socket.on('startup', function (data) {
    console.log('Startup message from server',data);
    socket.emit('startupack', 'hello from client');
  });
  
  var regbutton = document.createElement('button');
  regbutton.innerHTML = 'Register';
  regbutton.style.cssText = 'position: absolute; right: 10px; top:1px';
  document.body.appendChild(regbutton);
  regbutton.onclick = function() {
    console.log('Clicked Register');
    socket.emit('regmsg','Register Client');
  };
  
  var playbutton = document.createElement('button');
  playbutton.innerHTML = 'Play';
  playbutton.style.cssText = 'position: absolute; right: 10px; top:20px';
  document.body.appendChild(playbutton);
  playbutton.onclick = function() {
    console.log('Clicked Play');
    socket.emit('playmsg','Play Selected Song - Client');
  };

};
