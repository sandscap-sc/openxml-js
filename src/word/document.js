var Xml = require('../xml'),
    XmlNamespaces = require('../constants').XmlNamespaces;

var Document = function() {
  this.paras = [];
};

/**
 * Adds a new para to the document
 * @param {Paragraph} para
 */
Document.prototype.addPara = function(para) {
  this.paras.push(para);
};

Document.prototype.serialize = function() {
  var structure = {
    'xmlns:m': XmlNamespaces.m,
    'xmlns:mc': XmlNamespaces.mc,
    'xmlns:mo': XmlNamespaces.mo,
    'xmlns:mv': XmlNamespaces.mv,
    'xmlns:o': XmlNamespaces.o,
    'xmlns:r': XmlNamespaces.r,
    'xmlns:v': XmlNamespaces.v,
    'xmlns:w': XmlNamespaces.w,
    'xmlns:w10': XmlNamespaces.w10,
    'xmlns:w14': XmlNamespaces.w14,
    'xmlns:w15': XmlNamespaces.w15,
    'xmlns:wne': XmlNamespaces.wne,
    'xmlns:wp': XmlNamespaces.wp,
    'xmlns:wp14': XmlNamespaces.wp14,
    'xmlns:wpc': XmlNamespaces.wpc,
    'xmlns:wpg': XmlNamespaces.wpg,
    'xmlns:wpi': XmlNamespaces.wpi,
    'xmlns:wps': XmlNamespaces.wps,
    'mc:Ignorable': 'w14 w15 wp14',
    body: {
      p: this.paras.map(function(para) { return para.serialize().p; }),
      sectPr: {
        pgSz: {w: 12240, h: 15840},
        pgMar: {top: 1440, right: 1440, bottom: 1440, left: 1440, header: 720, footer: 720, gutter: 0},
        cols: {space: 720},
        docGrid: {linePitch: 360}
      }
    }
  };

  return Xml.element('document', structure, 'w');
};

module.exports = Document;
