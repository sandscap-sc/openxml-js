var Relationships = require('oxml-base').Relationships,
    RelationshipTypes = require('oxml-base').Constants.RelationshipTypes,
    Worksheet = require('./worksheet'),
    Xml = require('oxml-base').Xml,
    XmlNamespaces = require('oxml-base').Constants.XmlNamespaces;

/**
 * Manages all the data inside the document.
 * @constructor
 */
var Workbook = function() {
  this._sheets = [];

  // Create a new rels and add in style
  this._rels = new Relationships();
  this._rels.add('styles.xml', RelationshipTypes.Styles);
};

/**
 * Adds a new sheet into the workbook.
 * @param {string} name
 * @returns {Worksheet}
 */
Workbook.prototype.addSheet = function(name) {
  var rel, sheet;

  sheet = new Worksheet(name);

  rel = this._rels.add('worksheets/' + sheet.getFilename(), RelationshipTypes.Worksheet);
  this._sheets.push({
    id: this._sheets.length + 1,
    relId: rel.id,
    workSheet: sheet
  });

  return sheet;
};

Workbook.prototype.getSheets = function() {
  return this._sheets.map(function(sheet) {
    return sheet.workSheet;
  });
};

Workbook.prototype.getRelationships = function() {
  return this._rels;
};

Workbook.prototype.serialize = function() {
  var structure = {
    xmlns: XmlNamespaces.sml,
    'xmlns:mc': XmlNamespaces.mc,
    'xmlns:r': XmlNamespaces.r,
    'xmlns:x15': XmlNamespaces.x15,
    'mc:Ignorable': 'x15',
    sheets: {
      sheet: this._sheets.map(function(sheet) {
        return {name: sheet.workSheet.getName(), sheetId: sheet.id, 'r:id': sheet.relId};
      })
    }
  };

  return Xml.element('workbook', structure);
};

module.exports = Workbook;
