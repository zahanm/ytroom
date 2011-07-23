
requireCss('./index.css');

var dom = require('../lib/uki-core/dom');

dom.createStylesheet(__requiredCss);

window.startApp = function() {
  FB.api(
      '/me/friends',
      { fields: ['first_name', 'name', 'id'], limit: 30 },
      function(friends) {
        var lines = friends['data'].map(function(f) {
                return f.name + " | id: " + f.id;
              });
        document.getElementById('starter').innerHTML = lines.join('<br/>');
      }
  );
  var AsyncGet = require('../lib/asyncget').AsyncGet;
};
