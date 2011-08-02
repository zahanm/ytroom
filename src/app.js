
requireCss('./index.css');

var dom = require('../lib/uki-core/dom'),
    AsyncGet = require('../lib/asyncget').AsyncGet;

dom.createStylesheet(__requiredCss);

window.startApp = function() {
  var params = { allowScriptAccess: "always" };
  var atts = { id: "ytplayer" };
  swfobject.embedSWF("http://www.youtube.com/e/0NKUpo_xKyQ?enablejsapi=1&playerapiid=ytplayer",
    "ytplayer", "425", "356", "8", null, null, params, atts);
};

window.onYouTubePlayerReady = function() {
  var player = document.getElementById('ytplayer');
  player && player.playVideo();
};
