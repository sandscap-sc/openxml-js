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
  var defaultNodes, overrideNodes;

  defaultNodes = this.defaults.map(function (type) {
    return {
      Extension: type.extension,
      ContentType: type.contentType
    };
  });

  overrideNodes = this.overrides.map(function (override) {
    return {
      PartName: override.partName,
      ContentType: override.contentType
    }
  });

  return Xml.element('Types', {
    xmlns: 'http://schemas.openxmlformats.org/package/2006/content-types',
    Default: defaultNodes,
    Override: overrideNodes
  });
};

module.exports = ContentTypes;
