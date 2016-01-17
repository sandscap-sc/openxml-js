var Xml = require('../xml');

var Font = function(name, panose1, charset, family, pitch, signature) {
  this.name = name;
  this.panose1 = panose1;
  this.charset = charset;
  this.family = family;
  this.pitch = pitch;
  this.signature = signature;
};

Font.prototype.serialize = function() {
  var children = [];
  children.push(Xml.elementWithAttributes('w:panose1', {'w:val': this.panose1}));
  children.push(Xml.elementWithAttributes('w:charset', {'w:val': this.charset}));
  children.push(Xml.elementWithAttributes('w:family', {'w:val': this.family}));
  children.push(Xml.elementWithAttributes('w:pitch', {'w:val': this.pitch}));
  children.push(Xml.elementWithAttributes('w:sig', {
    'w:usb0': this.signature.usb0,
    'w:usb1': this.signature.usb1,
    'w:usb2': this.signature.usb2,
    'w:usb3': this.signature.usb3,
    'w:csb0': this.signature.csb0,
    'w:csb1': this.signature.csb1
  }));

  return Xml.elementWithAttributes('w:font', {'w:name': this.name}, children.join(''));
};

Font.createSignature = function(usb0, usb1, usb2, usb3, csb0, csb1) {
  return {
    usb0: usb0,
    usb1: usb1,
    usb2: usb2,
    usb3: usb3,
    csb0: csb0,
    csb1: csb1
  };
};

module.exports = Font;
