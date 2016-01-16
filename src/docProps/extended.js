var Xml = require('../xml'),
    XmlNamespaces = require('../constants').XmlNamespaces;

var ExtendedProperties = function() {
  this.props = {
    Application: 'Krypton',
    AppVersion: '0.0.1',
    Template: 'Normal.dotm',
    SharedDoc: 'false',
    HyperLinksChanged: 'false'
  };
};

ExtendedProperties.prototype.serialize = function() {
  var string, props = '', that = this;

  Object.keys(this.props).forEach(function(key) {
    props += Xml.elementWithContent(key, that.props[key]);
  });

  string = Xml.elementWithAttributes('Properties', {
    xmlns: XmlNamespaces.ExtendedProps,
    'xmlns:vt': XmlNamespaces.vt
  }, props);

  return string;
};

module.exports = ExtendedProperties;
