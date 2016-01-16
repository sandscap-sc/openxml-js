var ContentTypes = require('../content_types'),
    Constants = require('../constants'),
    Files = require('../constants').Word.Files,
    Relationships = require('../relationships'),
    WebSettings = require('./web_settings');

var Document = function() {
  this.type = Constants.DocumentTypes.Word;

  this.paras = [];
  this._relationships = new Relationships();

  this._contentTypes = new ContentTypes();
  this._createContentTypes();

  this._webSettings = new WebSettings();
};

/**
 * Gets the content types that are specific to the document.
 * @returns {{defaults: string, overrides: string}}
 */
Document.prototype.getContentTypes = function() {
  return this._contentTypes;
};

Document.prototype.getFiles = function() {
  return [
    {name: Files.Rels, contents: this._relationships.serialize()},
    {name: Files.WebSettings, contents: this._webSettings.serialize()}
  ];
};

/**
 * Creates required content types for the document.
 * @private
 */
Document.prototype._createContentTypes = function() {
  // TODO: (harisiva): Remember to add all image content types
  this._contentTypes.addDefault('jpeg', 'image/jpeg');

  this._contentTypes.addOverride('/' + Files.Document, Constants.ContentTypes.WordDocument);
  this._contentTypes.addOverride('/' + Files.Numbering, Constants.ContentTypes.Numbering);
  this._contentTypes.addOverride('/' + Files.Styles, Constants.ContentTypes.Styles);
  this._contentTypes.addOverride('/' + Files.Settings, Constants.ContentTypes.Settings);
  this._contentTypes.addOverride('/' + Files.WebSettings, Constants.ContentTypes.WebSettings);
  this._contentTypes.addOverride('/' + Files.FontTable, Constants.ContentTypes.FontTable);
  this._contentTypes.addOverride('/' + Files.Theme, Constants.ContentTypes.Theme);
};

module.exports = Document;
