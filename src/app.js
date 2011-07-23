
requireCss('./index.css');

var dom = require('../lib/uki-core/dom');

dom.createStylesheet(__requiredCss);

window.startApp = function() {
  FB.api(
      '/me',
      { fields: ['first_name', 'id', 'username'] },
      function(me) {
        document.getElementById('starter').innerHTML
          = 'Hi, ' + me.first_name + ' and ' + me.username
            + ' my id is ' + me.id;
      }
  );
};
