var Xml = require('oxml-base').Xml,
    XmlNamespaces = require('oxml-base').Constants.XmlNamespaces;

var CoreProperties = function (title) {
  this.title = title;
};

CoreProperties.prototype.serialize = function() {
  var titleElement = {};
  titleElement[this.title] = null;

  return Xml.element('cp:coreProperties', {
    'xmlns:cp': XmlNamespaces.cp,
    'xmlns:dc': XmlNamespaces.dc,
    'xmlns:dcterms': XmlNamespaces.dcterms,
    'xmlns:dcmitype': XmlNamespaces.dcmitype,
    'xmlns:xsi': XmlNamespaces.xsi,
    'dc:title': titleElement
  });
};

module.exports = CoreProperties;
