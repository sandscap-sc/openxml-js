var Font = function(name, panose1, charset, family, pitch, signature) {
  this.name = name;
  this.panose1 = panose1;
  this.charset = charset;
  this.family = family;
  this.pitch = pitch;
  this.signature = signature;
};

Font.prototype.serialize = function() {
  var structure = {
    name: this.name,
    panose1: {val: this.panose1},
    charset: {val: this.charset},
    family: {val: this.family},
    pitch: {val: this.pitch},
    sig: {
      usb0: this.signature.usb0,
      usb1: this.signature.usb1,
      usb2: this.signature.usb2,
      usb3: this.signature.usb3,
      csb0: this.signature.csb0,
      csb1: this.signature.csb1
    }
  };

  return structure;
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
