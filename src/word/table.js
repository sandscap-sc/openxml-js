var Paragraph = require('./paragraph'),
    Run = require('./run'),
    TableStyles = require('./style/styles').TableStyles;

var styleXml = '<w:cnfStyle w:val="100000000000" w:firstRow="1" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" ' +
'w:oddVBand="0" w:evenVBand="0" w:oddHBand="0" w:evenHBand="0" w:firstRowFirstColumn="0" '+
'w:firstRowLastColumn="0" w:lastRowFirstColumn="0" w:lastRowLastColumn="0"/> ';

var TableLook = {
  val: '0420',
  // First row is a header
  firstRow: 1,
  lastRow: 0,
  // First column is not of different type
  firstColumn: 0,
  lastColumn: 0,
  // Rows are banded
  noHBand: 0,
  noVBand: 1
};

/**
 * Creates a new Table with the provided number of columns.
 * @param {Number} columnCount
 * @constructor
 */
var Table = function(columnCount) {
  this.columnCount = columnCount;
  this.rows = [];
};

/**
 * Adds a new row to the table.
 * @param {[String]} row Array of values.
 */
Table.prototype.addRow = function(row) {
  this.rows.push(row.map(function(cell) {
    var para = new Paragraph();
    para.addRun(new Run({text: cell}));
    return para;
  }));
};

Table.prototype.serialize = function() {
  var cols = [], rows, props;

  for (var i = 0; i < this.columnCount; i++) {
    cols.push({w: 2000});
  }

  // Create rows. First one is styled differently because it is header row.
  rows = this.rows.map(function(row, index) {
    var cells = [], structure = {};

    if (index === 0) {
      structure['trPr'] = {};
      structure['trPr'][styleXml] = null;
    }

    row.forEach(function(cell) {
      cells.push({
        tcPr: {
          tcW: {w: 0, type: 'auto'}
        },
        p: cell.serialize().p
      });
    });

    structure['tc'] = cells;
    return structure;
  });

  props = {
    tblPr: {
      tblStyle: {val: TableStyles.GridTable1Light},
      tblW: {w: 0, type: 'auto'},
      tblLook: TableLook
    },
    tblGrid: {
      gridCol: cols
    },
    tr: rows
  };

  return {tbl: props};
};

module.exports = Table;
