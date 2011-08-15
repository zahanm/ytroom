
var path = require('path'),
    asyncget = require('./asyncget');

// --- Useful globals

window.requireCss = function(cwd, filename) {
  asyncget.getCSS(path.resolve(cwd, filename));
};

window.requireText = function() { return true; };
