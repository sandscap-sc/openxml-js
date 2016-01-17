var Xml = require('../xml'),
    XmlNamespaces = require('../constants').XmlNamespaces;

var Settings = function() {
};

Settings.prototype.serialize = function() {
  // TODO: (harisiva): Refactor out the repeated {w:val} assignments into a function
  var props =
    Xml.elementWithAttributes('w:zoom', {'w:percent': '100'}) +
    Xml.elementWithAttributes('w:characterSpacingControl', {'w:val': 'doNotCompress'}) +
    Xml.elementWithAttributes('w:themeFontLang', {'w:val': 'en-US'}) +
    Xml.elementWithAttributes('w:decimalSymbol', {'w:val': '.'}) +
    Xml.elementWithAttributes('w:listSeparator', {'w:val': ','}) +
      // TODO: Create a real document id here
    Xml.elementWithAttributes('w15:docId', {'w15:val': '{FFFFF82B-A1D2-465B-82CE-BF2A1CA965C2}'});

  return Xml.elementWithAttributes('w:settings', {
    'xmlns:mc': XmlNamespaces.mc,
    'xmlns:o': XmlNamespaces.o,
    'xmlns:r': XmlNamespaces.r,
    'xmlns:m': XmlNamespaces.m,
    'xmlns:w10': XmlNamespaces.w10,
    'xmlns:w': XmlNamespaces.w,
    'xmlns:w14': XmlNamespaces.w14,
    'xmlns:w15': XmlNamespaces.w15,
    'xmlns:sl': XmlNamespaces.sl,
    'xmlns:v': XmlNamespaces.v,
    'mc:Ignorable': 'w14 w15'
  }, props);
};

module.exports = Settings;
