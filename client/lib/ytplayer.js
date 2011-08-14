
var ytplayer = exports;

ytplayer.makePlayer = function(url) {
  var params = { allowScriptAccess: "always" };
  var atts = { id: "ytplayer" };
  swfobject.embedSWF(
    url, "ytplayer", "425", "356", "8", null, null, params, atts);
};
