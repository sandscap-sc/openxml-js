var Xml = require('./xml');

var TargetModes = {
  External: 'External',
  Internal: 'Internal'
};

var TargetTypes = {
  CoreProps: 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties',
  ExtendedProps: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties',
  FontTable: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable',
  HyperLink: 'http://schemas.microsoft.com/office/2006/relationships/hyperlink',
  Image: 'http://schemas.microsoft.com/office/2006/relationships/image',
  Numbering: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering',
  OfficeDoc: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument',
  Settings: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings',
  Styles: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles',
  Theme: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme',
  WebSettings: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings',
};

var Relationship = function(id, target, targetType, opt_targetMode) {
  this.id = id;
  this.target = target;
  this.targetType = targetType;
  this.targetMode = opt_targetMode;
};

Relationship.prototype.serialize = function() {
  var props = {
    Id: this.id,
    Target: this.target,
    Type: this.targetType
  };

  if (this.targetMode) {
    props.targetMode = this.targetMode;
  }

  return Xml.elementWithAttributes('Relationship', props);
};

module.exports = Relationship;
module.exports.TargetModes = TargetModes;
module.exports.TargetTypes = TargetTypes;
