var ParagraphStyles = require('./style/styles').ParagraphStyles;

var Paragraph = function () {
  this.runs = [];
  this.numberedListStyle = null;
};

Paragraph.prototype.styleAsList = function (indentationLevel, listStyle) {
  this.style = ParagraphStyles.List;
  this.numberedListStyle = {
    indentLevel: indentationLevel,
    numberTypeId: listStyle
  };
};

Paragraph.prototype.addRun = function (run) {
  this.runs.push(run);
};

/**
 * Serializes the paragraph into JSON form that can be converted into XML.
 * @returns {{p: {}}}
 */
Paragraph.prototype.serialize = function () {
  var structure = {}, pPr;
  if (this.style) {
    pPr = {};
    pPr['pStyle'] = {
        val: this.style
    };

    if (this.numberedListStyle) {
      pPr['numPr'] = {
        ilvl: {val: this.numberedListStyle.indentLevel},
        numId: {val: this.numberedListStyle.numberTypeId}
      };
    }
  }

  if (pPr) {
    structure['pPr'] = pPr;
  }

  if (this.runs) {
    structure['r'] = this.runs.map(function(run) { return run.serialize().r; });
  }

  return {p: structure};
};

module.exports = Paragraph;
