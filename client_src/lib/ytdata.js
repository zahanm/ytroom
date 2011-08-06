
var utils = require('../extlib/uki-core/utils'),
    asyncget = require('./asyncget'),
    ytutils = require('./ytutils'),
    
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
    restriction: 'US',
    format: 5 // embeddable on 3rd party sites
  };
  asyncget.get('https://gdata.youtube.com/feeds/api/videos', options, function(r) {
    console && console.log(r); // DEBUG
    var results = ytdata.parseResults(r);
    callback && callback(results);
  });
};

ytdata.parseResults = function(r) {
  var results = utils.map(r.feed.entry || [], function(entry) {
    var media = entry.media$group;
    return {
      title: media.media$title.$t,
      embedurl: ytutils.pluck1(media.media$content, 'type', 'application/x-shockwave-flash').url,
      description: media.media$description.$t,
      author: entry.author[0].name.$t
    };
  });
  return results;
};
