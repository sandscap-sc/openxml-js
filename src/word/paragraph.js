var ParagraphStyles = require('./style').ParagraphStyles;

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

Paragraph.prototype.serialize = function () {
  var string = '<w:p>';

  if (this.style) {
    string += '<w:pPr>';
    string += '<w:pStyle w:val="' + this.style + '" />';

    if (this.numberedListStyle) {
      string += '<w:numPr>';
      string += '<w:ilvl w:val="' + this.numberedListStyle.indentLevel + '"/>';
      string += '<w:numId w:val="' + this.numberedListStyle.numberTypeId + '"/>';
      string += '</w:numPr>';
    }

    string += '</w:pPr>';
  }

  string += this.runs
    .map(function (run) {
      return run.serialize();
    })
    .join(' ');

  string += '</w:p>';
  return string;
};

module.exports = Paragraph;
