var CharacterStyles = require('./style/styles').CharacterStyles;

var RunFormatting = {
  Bold: 'bold',
  Italics: 'italics',
  StrikeThrough: 'strike',
  Underline: 'underline'
};

var RunStyles = {
  Heading1: 'Heading1',
  Heading2: 'Heading2'
};

var Run = function (options) {
  this.text = options.text;
  this.drawing = options.drawing;

  this.style = options.style;
  this.formatting = options.formatting || [];
};

Run.prototype.serialize = function () {
  var rPr, structure = {}, drawingContents;

  if (this.formatting.length > 0 || this.style) {
    rPr = {};
    this.formatting.forEach(function(style) {
      switch(style) {
        case RunFormatting.Bold:
          rPr['b'] = {};
          break;
        case RunFormatting.Italics:
          rPr['i'] = {};
          break;
        case RunFormatting.StrikeThrough:
          // Only support single line strike-through through the center
          rPr['strike'] = {};
          break;
        case RunFormatting.Underline:
          rPr['u'] = {val: 'single'};
          break;
        default:
          throw new Error('Unknown run formatting ' + style);
      }
    });

    if (this.style) {
      rPr['rStyle'] = {val: CharacterStyles[style]};
    }
  }

  // TODO: Remember to escape content here
  if (this.text) {
    structure['t'] = {};
    structure['t']['xml:space'] = 'preserve';
    structure['t'][this.text] = null;
  } else if (this.drawing) {
    if (!rPr) {
      rPr  = {};
    }

    rPr['noProof'] = {};
    drawingContents = this.drawing.serialize();
    structure[drawingContents.diagram] = drawingContents;
  }

  if (rPr) {
    structure['rPr'] = rPr;
  }

  return {r: structure};
};

module.exports = Run;
module.exports.RunFormatting = RunFormatting;
