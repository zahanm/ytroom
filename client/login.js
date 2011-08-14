
var constants = require('./secure/constants');

(function() {
  FB.init({
    appId: constants.DEV_FB_APP_ID,
    status: false,
    cookie: true,
    xfbml: true,
    oauth: true
  });
  FB.Event.subscribe('auth.login', function(r) {
    location.href = './';
  });
  FB.getLoginStatus(function(r) {
    if (r.authResponse || r.session) {
      location.href = './';
    }
  });
})();
