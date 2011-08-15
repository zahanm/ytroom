
var view = require('../extlib/uki-view'),
    dom = require('../extlib/uki-core/dom'),
    builder = require('../extlib/uki-core/builder').build,

    Container = require('../extlib/uki-core/view/container').Container;

/**
 * Search box and accompanying list
 */
var Searchlist = view.newClass('Searchlist', Container, {
  _createDom: function() {
    this._dom = dom.createElement('div', { className: 'Searchlist' });

    this._refs = builder([
      { view: 'Container', rect: '10 10 300 50', anchors: 'left top', childViews: [
        { view: 'nativeControl.Text', rect: '70 0 150 24', anchors: 'left top', placeholder: 'Search here' }
      ] },
      { view: 'DataList', rect: '0 0 300 100', anchors: 'left top', rowHeight: 33 }
    ]).appendTo(this);
  }
});

exports.Searchlist = Searchlist;
