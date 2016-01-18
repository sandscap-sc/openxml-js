var Constants = require('../constants'),
    Hyperlink = require('./hyperlink'),
    Paragraph = require('./paragraph'),
    Relationships = require('../relationships'),
    Xml = require('../xml'),
    XmlNamespaces = require('../constants').XmlNamespaces;

/**
 * Creates a new document instance. Relationships (such as hyperlinks) are added into the provided collection.
 * @constructor
 */
var Document = function() {
  this.children = [];
  this._relationships = new Relationships();
};

/**
 * Adds a new para to the document.
 * @param {Paragraph} para
 */
Document.prototype.addPara = function(para) {
  this.children.push(para);
};

/**
 * Adds a new table to the document.
 * @param {Table} table
 */
Document.prototype.addTable = function(table) {
  this.children.push(table);
};

/**
 * Adds a new hyperlink into the document. Adds it to content and into relationships.
 * @param {String} linkUrl
 */
Document.prototype.addHyperlink = function(linkUrl) {
  var relationship, hyperlink, para;

  relationship = this._relationships.add(
    linkUrl,
    Constants.RelationshipTypes.HyperLink,
    Constants.RelationshipTargetModes.External);

  hyperlink = new Hyperlink(relationship.id, linkUrl);

  para = new Paragraph();
  para.addHyperlink(hyperlink);

  this.children.push(para);
};

Document.prototype.getRelationships = function() {
  return this._relationships;
};

Document.prototype.serialize = function() {
  var body = {}, structure;

  // TODO: (harisiva): Resorting to this hack because cannot define
  // something like <p><table><p> in the map structure.
  this.children.forEach(function(child) {
    var serialized = child.serialize();
    Object.keys(serialized).forEach(function(key) {
      body[Xml.element(key, serialized[key], 'w')] = null;
    });
  });

  body['sectPr'] = {
    pgSz: {w: 12240, h: 15840},
    pgMar: {top: 1440, right: 1440, bottom: 1440, left: 1440, header: 720, footer: 720, gutter: 0},
    cols: {space: 720},
    docGrid: {linePitch: 360}
  };

  structure = {
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
    body: body
  };

  return Xml.element('document', structure, 'w');
};

module.exports = Document;