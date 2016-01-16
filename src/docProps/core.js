var Xml = require('../xml'),
    XmlNamespaces = require('../constants').XmlNamespaces;

var CoreProperties = function (title) {
  this.title = title;
};

CoreProperties.prototype.serialize = function() {
  var string = Xml.elementWithAttributes(
    'cp:coreProperties', {
      'xmlns:cp': XmlNamespaces.cp,
      'xmlns:dc': XmlNamespaces.dc,
      'xmlns:dcterms': XmlNamespaces.dcterms,
      'xmlns:dcmitype': XmlNamespaces.dcmitype,
      'xmlns:xsi': XmlNamespaces.xsi
    },
    Xml.elementWithContent('dc:title', this.title));
  return string;
};

module.exports = CoreProperties;
