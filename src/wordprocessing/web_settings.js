var Xml = require('../xml'),
    XmlNamespaces = require('../constants').XmlNamespaces;

var WebSettings = function() {
};

WebSettings.prototype.serialize = function() {
  return Xml.element('webSettings', {
    'xmlns:mc': XmlNamespaces.mc,
    'xmlns:r': XmlNamespaces.r,
    'xmlns:w': XmlNamespaces.w,
    'xmlns:w14': XmlNamespaces.w14,
    'xmlns:w15': XmlNamespaces.w15,
    'mc:Ignorable': 'w14 w15',
    allowPNG: {},
    doNotSaveAsSingleFile: {},
    pixelsPerInch: {val: 96}
  }, 'w');
};

module.exports = WebSettings;
