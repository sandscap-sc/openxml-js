/**
 * Creates a new range of cell. Top Left to Bottom Right of the rectangle.
 * @param {string} startCell
 * @param {string} endCell
 * @constructor
 */
var CellRange = function(startCell, endCell) {
  this.startCell = startCell;
  this.endCell = endCell;
};

/**
 * Converts range into form that can be used in table and worksheet ref ranges.
 * @returns {string}
 */
CellRange.prototype.toString = function() {
  return this.startCell + ':' + this.endCell;
};

module.exports = CellRange;