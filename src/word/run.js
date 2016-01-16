var CharacterStyles = require('./style').CharacterStyles;

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
  var run, runProps = '', contents;

  if (this.formatting.length > 0 || this.style) {
    this.formatting.forEach(function (style) {
      switch (style) {
        case RunFormatting.Bold:
          runProps += '<w:b />';
          break;
        case RunFormatting.Italics:
          runProps += '<w:i />';
          break;
        case RunFormatting.StrikeThrough:
          // Only support single line strike-through through the center
          runProps += '<w:strike />';
          break;
        case RunFormatting.Underline:
          // Only support single underline
          runProps += '<w:u w:val="single" />';
          break;
        default:
          throw new Error('Unknown run formatting ' + style);
      }
    });

    if (this.style) {
      runProps += '<w:rStyle w:val="' + CharacterStyles[style] + '" />';
    }
  }

  // TODO: Remember to escape content here
  if (this.text) {
    contents = '<w:t xml:space="preserve">' + this.text + '</w:t>';
  } else if (this.drawing) {
    runProps += '<w:noProof />';
    contents = this.drawing.serialize();
  }

  run = '<w:r>';
  run += runProps.length > 0 ? '<w:rPr>' + runProps + '</w:rPr>' : '';
  run += contents;
  run += '</w:r>';

  return run;
};

module.exports = Run;
module.exports.RunFormatting = RunFormatting;
