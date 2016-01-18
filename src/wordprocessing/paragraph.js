var ParagraphStyles = require('./style/styles').ParagraphStyles,
    Xml = require('../xml');

var Paragraph = function () {
  this.children = [];
  this.numberedListStyle = null;
};

Paragraph.prototype.styleAsList = function (indentationLevel, listStyle) {
  this.style = ParagraphStyles.List;
  this.numberedListStyle = {
    indentLevel: indentationLevel,
    numberTypeId: listStyle
  };
};

/**
 * Adds new run into the paragraph.
 * @param {Run} run
 */
Paragraph.prototype.addRun = function (run) {
  this.children.push(run);
};

/**
 * Adds new hyperlink into the paragraph.
 * @param {Hyperlink} hyperlink
 */
Paragraph.prototype.addHyperlink = function (hyperlink) {
  this.children.push(hyperlink);
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

  this.children.forEach(function (child) {
    var serialized = child.serialize();
    Object.keys(serialized).forEach(function (key) {
      structure[Xml.element(key, serialized[key], 'w')] = null;
    });
  });

  return {p: structure};
};

module.exports = Paragraph;
