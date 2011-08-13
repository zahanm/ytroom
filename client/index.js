
var dom = require('./extlib/uki-core/dom'),

    constants = require('../secure/constants'),
    ytdata = require('./lib/ytdata');

(function() {
  FB.init({
    appId: constants.DEV_FB_APP_ID,
    status: true,
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
  });
  var params = { allowScriptAccess: "always" };
  var atts = { id: "ytplayer" };
  swfobject.embedSWF(
    "http://www.youtube.com/e/0NKUpo_xKyQ?enablejsapi=1&playerapiid=ytplayer",
    "ytplayer", "425", "356", "8", null, null, params, atts);
};

window.onYouTubePlayerReady = function() {
  var player = document.getElementById('ytplayer');
  player && player.pauseVideo();
};
