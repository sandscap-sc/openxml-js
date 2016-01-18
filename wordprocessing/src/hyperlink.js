var HyperlinkStyles = require('./style/styles').HyperlinkStyles,
    Run = require('./run');

/**
 * Creates a new hyperlink for the given URL.
 * @param {String} relationshipId
 * @param {String} url
 * @constructor
 */
var Hyperlink = function(relationshipId, url) {
  this.relationshipId = relationshipId;
  this.url = url;
};

Hyperlink.prototype.serialize = function() {
  var run = new Run({
    text: this.url,
    style: HyperlinkStyles.Hyperlink
  });

  var structure = {
    'r:id': this.relationshipId,
    history: 0,
    r: run.serialize().r
  };

  return {hyperlink: structure};
};

module.exports = Hyperlink;
