var Xml = require('oxml-base').Xml,
    XmlNamespaces = require('oxml-base').Constants.XmlNamespaces;

var tableStyleInfo = {
  name: 'TableStyleMedium9',
  showFirstColumn: 0,
  showLastColumn: 0,
  showRowStripes: 1,
  showColumnStripes: 0
};

/**
 * Creates a new table that works on a range of cells in a sheet.
 * @param {{id: {number}, name: {string}, displayName: {string}}} options
 * @param {CellRange} cellRange
 * @param {[{string}]} columnNames
 * @constructor
 */
var Table = function(options, cellRange, columnNames) {
  // Excel does not allow spaces in table names
  if (options.name.indexOf(' ') !== -1 || options.displayName.indexOf(' ') !== -1) {
    throw new Error('Spaces not allowed in table names');
  }

  this._id = options.id;
  this._name = options.name;
  this._displayName = options.displayName;
  this._columnNames = columnNames;
  this._cellRange = cellRange;
};

Table.prototype.getFilename = function() {
  return this._name + '.xml';
};

Table.prototype.serialize = function() {
  var structure = {
    xmlns:XmlNamespaces.sml,
    id: this._id,
    name: this._name,
    displayName: this._displayName,
    ref: this._cellRange.toString(),
    totalsRowShown: 0,
    autoFilter: {ref: this._cellRange.toString()},
    tableColumns: {
      count: this._columnNames.length,
      tableColumn: this._columnNames.map(function(column, index) {return {id: index + 1, name: column}})
    },
    tableStyleInfo: tableStyleInfo
  };

  return Xml.element('table', structure);
};

module.exports = Table;
