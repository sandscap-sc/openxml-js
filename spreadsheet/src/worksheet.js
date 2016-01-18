var CellRange = require('./cell_range'),
    Relationships = require('oxml-base').Relationships,
    RelationshipTypes = require('oxml-base').Constants.RelationshipTypes,
    Xml = require('oxml-base').Xml,
    XmlNamespaces = require('oxml-base').Constants.XmlNamespaces;

var Worksheet = function(name) {
  this.name = name;

  this._tables = [];
  this._rels = new Relationships();
  this._rows = [];

  this._columnNames = [];
};

/**
 * Adds a new table to the sheet.
 * TODO: (harisiva): It is implicitly assumed that the table encompasses the entire sheet contents.
 * @param {Table} table
 */
Worksheet.prototype.addTable = function(table) {
  var rel;

  rel = this._rels.add('../tables/' + table.getFilename(), RelationshipTypes.Table);
  this._tables.push({relId: rel.id, table: table});

  return rel;
};

/**
 * Adds a new row to the sheet. For now, assuming that it is rectangular.
 * @param {[]} row
 */
Worksheet.prototype.addRow = function(row) {
  if (row.length === 0) {
    throw new Error('Expect non-zero columns in a row');
  }

  this._rows.push(row);

  // If this is the first time that a row was added, then compute all column names
  if (this._rows.length === 1) {
    this._columnNames = this._computeColumnNames(row.length);
  }
};

Worksheet.prototype.getTables = function() {
  return this._tables.map(function(table) {
    return table.table;
  });
};

/**
 * Retrieves name of the file that has this sheet data.
 * @returns {string}
 */
Worksheet.prototype.getFilename = function() {
  return this.name + '.xml';
};

Worksheet.prototype.getRelationships = function() {
  return this._rels;
};

/**
 * Gets the first cell and last cell in the sheet. Assumed to be rectangular.
 */
Worksheet.prototype.getCellRange = function() {
  if (this._rows.length === 0) {
    return null;
  }

  // Assuming all rows have the same number of columns
  return new CellRange(
    'A1',
    this._columnNames[this._columnNames.length - 1] + this._rows.length);
};

Worksheet.prototype.serialize = function() {
  var rowsStructure, structure, that = this;

  rowsStructure = this._rows.map(function(rowValues, rowIndex) {
    var cellValues = rowValues.map(function(cell, columnIndex) {
      var value = {};
      value[cell] = null;

      return {
        r: that._columnNames[columnIndex] + (rowIndex + 1),
        t: 'inlineStr', // TODO: (harisiva): Temporary, support real data types,
        is: {
          t: value
        }
      }
    });

    return {
      r: rowIndex + 1,
      c: cellValues
    }
  });

  structure = {
    xmlns: XmlNamespaces.sml,
    'xmlns:mc': XmlNamespaces.mc,
    'xmlns:r': XmlNamespaces.r,
    'xmlns:x14ac': XmlNamespaces.x14ac,
    'mc:Ignorable': 'x14ac'
  };

  if (this._rows.length > 0) {
    structure['dimension'] = {};
    structure['dimension']['ref'] = this.getCellRange().toString();
  }

  if (this._tables.length > 0) {
    structure['cols'] = {
      col: {
        min: 1,
        max: 1,
        width: 11,
        customWidth: 1
      }
    };
  }

  structure['sheetData'] = {};
  structure['sheetData']['row'] = rowsStructure;

  if (this._tables.length > 0) {
    structure['tableParts'] = {
      count: this._tables.length,
      tablePart: this._tables.map(function (table) {
        return {'r:id': table.relId};
      })
    }
  }

  return Xml.element('worksheet', structure);
};

Worksheet.prototype._computeColumnNames = function(columns) {
  var names = [], prefixIndex = -1, prefix, char;

  for (var i = 0; i < columns; i++) {
    prefix = prefixIndex === -1 ? '' : names[prefixIndex];
    char = String.fromCharCode(65 + (i % 26));

    names.push(prefix + char);

    if (i % 26 === 25) {
      prefixIndex++;
    }
  }

  return names;
};

module.exports = Worksheet;
