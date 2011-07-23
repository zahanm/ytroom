
var fun = require('./uki-core/function'),
    utils = require('./uki-core/utils');

/**
 * Really simple on purpose
 * Just use the get() method
 */
var AsyncGet = fun.newClass({

  init: function() {
    this._params = '';
  },

  _addParam: function(key, data) {
    this._params += (this._params ? '&' : '?')
      + encodeURIComponent(key) + '=' + encodeURIComponent(data);
  },

  get: function(url, data, cb) {

    var g = AsyncGet._guid++ ;
    utils.extend(data, { callback: 'AsyncGet._callbacks.' + g } );

    utils.forEach(data, fun.bind(function(v, k) {
      this._addParam(k, v);
    }, this));
    // XXX temporarily abandoned, until server with full urls is running
    // url += (url.charAt(url.length - 1) == '/') ? '' : '/';
    url += this._params;

    var script = document.createElement('script');

    AsyncGet._callbacks[g] = function(response) {
      cb && cb(response);
      delete AsyncGet._callbacks[g];
      script.parentNode.removeChild(script);
    };

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);

  }

});

AsyncGet._guid = 1;
AsyncGet._callbacks = {};

exports.AsyncGet = AsyncGet;
