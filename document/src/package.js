var ContentTypes = require('oxml-base').ContentTypes,
    Constants = require('oxml-base').Constants,
    CoreProperties = require('./docProps/core'),
    ExtendedProperties = require('./docProps/extended'),
    JsZip = require('jszip'),
    Relationships = require('oxml-base').Relationships;

var Package = function(document) {
  this._document = document;
  this._coreProps = new CoreProperties('foo');
  this._extendedProps = new ExtendedProperties();

  // Relationships that are setup at the package level
  this._packageRels = new Relationships();
  this._createPackageRels();

  this._contentTypes = new ContentTypes();
  this._createContentTypes();
};

Package.prototype.createZip = function() {
  var zip = new JsZip(), merged, that = this;

  // Package level items
  zip.file(Constants.Files.PackageRels, this._addXmlHeader(this._packageRels.serialize()));
  zip.file(Constants.Files.CoreProps, this._addXmlHeader(this._coreProps.serialize()));
  zip.file(Constants.Files.ExtendedProps, this._addXmlHeader(this._extendedProps.serialize()));

  // Merge in content types requested from the document as well
  merged = this._mergeContentTypes(this._contentTypes, this._document.getContentTypes());
  zip.file(Constants.Files.ContentTypes, this._addXmlHeader(merged.serialize()));

  // Document specific items
  var docFiles = this._document.getFiles();
  docFiles.forEach(function(file) {
    if(file.name.indexOf('.xml') !== -1) {
      zip.file(file.name, that._addXmlHeader(file.contents));
    } else {
      zip.file(file.name, file.contents);
    }
  });

  return zip;
};

Package.prototype._createPackageRels = function() {
  var docSettings = Constants[this._document.type];

  this._packageRels.add(Constants.Files.CoreProps, Constants.RelationshipTypes.CoreProps);
  this._packageRels.add(Constants.Files.ExtendedProps, Constants.RelationshipTypes.ExtendedProps);
  this._packageRels.add(docSettings.Files.Document, Constants.RelationshipTypes.OfficeDoc);
};

Package.prototype._createContentTypes = function() {
  this._contentTypes.addDefault('xml', 'application/xml');
  this._contentTypes.addDefault('rels', Constants.ContentTypes.Relationships);

  // Add in props as overrides
  this._contentTypes.addOverride('/' + Constants.Files.CoreProps, Constants.ContentTypes.CoreProperties);
  this._contentTypes.addOverride('/' + Constants.Files.ExtendedProps, Constants.ContentTypes.ExtendedProperties);
};

Package.prototype._mergeContentTypes = function(first, second) {
  var merged = new ContentTypes();

  [].concat(first.defaults).concat(second.defaults).forEach(function(type) {
    merged.addDefault(type.extension, type.contentType);
  });

  [].concat(first.overrides).concat(second.overrides).forEach(function(type) {
    merged.addOverride(type.partName, type.contentType);
  });

  return merged;
};

Package.prototype._addXmlHeader = function(contents) {
  var xmlHeader = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  if (contents.indexOf(xmlHeader) !== 0) {
    return xmlHeader + '\n' + contents;
  }

  return contents;
};

module.exports = Package;
