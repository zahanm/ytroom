
var utils = require('../extlib/uki-core/utils'),

    ytutils = exports;

ytutils.pluck1 = function(arrayLike, prop, value) {
  var matched;
  utils.forEach(arrayLike, function(elem) {
    if (elem[prop] === value) {
      matched = elem;
      return false;
    }
  });
  return matched;
};
