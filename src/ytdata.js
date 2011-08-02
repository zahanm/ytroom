
var asyncget = require('../lib/asyncget'),
    
    ytdata = exports;

ytdata.search = function(query, callback) {
  var options = {
    q: query,
    key: 'AI39si6EcpDtltn7q2uMfOwjL9uEkk1GHXaHRbEHO9aKBR56W1WwCy7QyUsGPOTPNYsYr2iKvBUq-I7wNaLjrw6Ch_OefRWOtw',
    orderBy: 'viewCount',
    paid_content: 'false',
    'max-results': 10,
    prettyprint: true,
    alt: 'json-in-script',
    restriction: 'US'
  };
  asyncget.get('https://gdata.youtube.com/feeds/api/videos', options, function(r) {
    callback && callback(r);
  });
};
