var Xml = require('../xml'),
    XmlNamespaces = require('../constants').XmlNamespaces;

var WebSettings = function() {
};

WebSettings.prototype.serialize = function() {
  var props = Xml.elementWithContent('w:allowPNG') +
      Xml.elementWithContent('w:doNotSaveAsSingleFile') +
      Xml.elementWithAttributes('w:pixelsPerInch', {'w:val': '96'});

  return Xml.elementWithAttributes('w:webSettings', {
    'xmlns:mc': XmlNamespaces.mc,
    'xmlns:r': XmlNamespaces.r,
    'xmlns:w': XmlNamespaces.w,
    'xmlns:w14': XmlNamespaces.w14,
    'xmlns:w15': XmlNamespaces.w15,
    'mc:Ignorable': 'w14 w15'
  }, props);
};

module.exports = WebSettings;
