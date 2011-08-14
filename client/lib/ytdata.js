
var utils = require('../extlib/uki-core/utils'),
    asyncget = require('./asyncget'),
    ytutils = require('./ytutils'),
    constants = require('../secure/constants'),

    ytdata = exports;

ytdata.search = function(query, callback) {
  var options = {
    q: query,
    key: constants.YT_APP_KEY,
    orderBy: 'viewCount',
    paid_content: 'false',
    'max-results': 10,
    prettyprint: true, // TODO revert once debugging isn't needed :)
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
