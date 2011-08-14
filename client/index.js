
var dom = require('./extlib/uki-core/dom'),
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
    } else {
      location.href = './login.html';
    }
  }, true);
})();

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
