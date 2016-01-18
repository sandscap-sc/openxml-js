var Xml = require('oxml-base').Xml,
    XmlNamespaces = require('oxml-base').Constants.XmlNamespaces;

var ExtendedProperties = function() {
};

ExtendedProperties.prototype.serialize = function() {
  var structure = {
    xmlns: XmlNamespaces.ExtendedProps,
    'xmlns:vt': XmlNamespaces.vt,
    Template: {'Normal.dotm': null},
    Application: {'Krypton': null},
    SharedDoc: {'false': null},
    HyperlinksChanged: {'false': null},
    AppVersion: {'0.0.1': null}
  };

  return Xml.element('Properties', structure);
};

module.exports = ExtendedProperties;
