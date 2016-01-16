var Xml = require('./xml');

var ContentTypes = function() {
  this.defaults = [];
  this.overrides = [];
};

ContentTypes.prototype.addDefault = function(extension, contentType) {
  this.defaults.push({ extension: extension, contentType: contentType });
};

ContentTypes.prototype.addOverride = function(partName, contentType) {
  this.overrides.push({ partName: partName, contentType: contentType });
};

ContentTypes.prototype.serialize = function() {
  var defaultNodes, overrideNodes, string;

  defaultNodes = this.defaults.map(function(type) {
    return Xml.elementWithAttributes('Default', {
      Extension: type.extension,
      ContentType: type.contentType
    });
  });

  overrideNodes = this.overrides.map(function(override) {
    return Xml.elementWithAttributes('Override', {
      PartName: override.partName,
      ContentType: override.contentType
    });
  });

  string = '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">';
  string += defaultNodes.concat(overrideNodes).join('');
  string += '</Types>';
  return string;
};

module.exports = ContentTypes;
