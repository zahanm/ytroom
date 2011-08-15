
var utils = require('../extlib/uki-core/utils'),
    builder = require('../extlib/uki-core/builder'),
    view = require('../extlib/uki-view');

utils.extend(view,
  require('./searchlist')
);

// register view as default search path for views
builder.namespaces.unshift(view);

console.log(__dirname);
