var Font = require('./font'),
    Xml = require('oxml-base').Xml,
    XmlNamespaces = require('oxml-base').Constants.XmlNamespaces;

var Symbol = new Font(
  'Symbol', '00000000000000000000', '02', 'auto', 'variable',
  Font.createSignature('00000000', '00000000', '00000000', '00000000', '80000000', '00000000'));

var TimesNewRoman = new Font(
  'Times New Roman', '02020603050405020304', '00', 'auto', 'variable',
  Font.createSignature('E0002AEF', 'C0007841', '00000009', '00000000', '000001FF', '00000000'));

var CourierNew = new Font(
  'Courier New', '02070309020205020404', '00', 'auto', 'variable',
  Font.createSignature('E0002AFF', 'C0007843', '00000009', '00000000', '000001FF', '00000000'));

var Wingdings = new Font(
  'Wingdings', '05000000000000000000', '02', 'auto', 'variable',
  Font.createSignature('00000000', '10000000', '00000000', '00000000', '80000000', '00000000'));

var Calibri = new Font(
  'Calibri', '020F0502020204030204', '00', 'auto', 'variable',
  Font.createSignature('E00002FF', '4000ACFF', '00000001', '00000000', '0000019F', '00000000'));

var CalibriLight = new Font(
  'Calibri Light', '020F0302020204030204', '00', 'auto', 'variable',
  Font.createSignature('A00002EF', '4000207B', '00000000', '00000000', '0000019F', '00000000'));

var Arial = new Font(
  'Arial', '020B0604020202020204', '00', 'auto', 'variable',
  Font.createSignature('E0002AFF', 'C0007843', '00000009', '00000000', '000001FF', '00000000'));

var Fonts = function() {
  this.fonts = [];

  // For now, just add all the default fonts
  this.fonts.push(Symbol);
  this.fonts.push(TimesNewRoman);
  this.fonts.push(CourierNew);
  this.fonts.push(Wingdings);
  this.fonts.push(Calibri);
  this.fonts.push(CalibriLight);
  this.fonts.push(Arial);
};

Fonts.prototype.serialize = function() {
  return Xml.element('fonts', {
    'xmlns:mc': XmlNamespaces.mc,
    'xmlns:r': XmlNamespaces.r,
    'xmlns:w': XmlNamespaces.w,
    'xmlns:w14': XmlNamespaces.w14,
    'xmlns:w15': XmlNamespaces.w15,
    'mc:Ignorable': 'w14 w15',
    font: this.fonts.map(function(font) { return font.serialize() })
  }, 'w');
};

module.exports = Fonts;
