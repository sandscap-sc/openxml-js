var Xml = require('oxml-base').Xml,
    XmlNamespaces = require('oxml-base').Constants.XmlNamespaces;

var Settings = function() {
};

Settings.prototype.serialize = function() {
  var props = {
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
    'mc:Ignorable': 'w14 w15',
    zoom: {percent: 100},
    characterSpacingControl: {val: 'doNotCompress'},
    themeFontLang: {val: 'en-US'},
    decimalSymbol: {val: '.'},
    listSeparator: {val: ','}
  };

  return Xml.element('settings', props, 'w');
};

module.exports = Settings;
