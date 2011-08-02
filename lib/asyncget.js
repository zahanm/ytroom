
var fun = require('./uki-core/function'),
    utils = require('./uki-core/utils'),

    asyncget = exports;

/**
 * Really simple on purpose
 * Just use the get() method
 */
asyncget.get = function(url, data, cb) {
  var g = global.asyncget._guid++ ;
  utils.extend(data, { callback: 'asyncget._callbacks.f' + g } );

  var params = '';
  utils.forEach(data, function(v, k) {
    params = addParam(params, k, v);
  });
  // XXX temporarily abandoned, until server with full urls is running
  // url += (url.charAt(url.length - 1) == '/') ? '' : '/';
  url += params;

  var script = document.createElement('script');

  global.asyncget._callbacks['f' + g ] = function(response) {
    cb && cb(response);
    delete global.asyncget._callbacks[g];
    script.parentNode.removeChild(script);
  };

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

// --- utility functions

function addParam (params, key, data) {
  return params + (params ? '&' : '?')
    + encodeURIComponent(key) + '=' + encodeURIComponent(data);
}

// Global static variables
global.asyncget = {};
global.asyncget._guid = 1;
global.asyncget._callbacks = {};
