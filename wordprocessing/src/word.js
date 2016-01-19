var ContentTypes = require('oxml-base').ContentTypes,
    Constants = require('oxml-base').Constants,
    Files = require('oxml-base').Constants.Word.Files,
    Fonts = require('./fonts'),
    Settings = require('./settings'),
    Styles = require('./style/styles'),
    WebSettings = require('./web_settings');

/**
 * Creates a new instance of word processing file with the provided document contents.
 * @param {Document} document
 * @constructor
 */
var Word = function(document) {
  this.type = Constants.DocumentTypes.Word;

  this._document = document;

  this._addRelationships();

  this._contentTypes = new ContentTypes();
  this._createContentTypes();

  this._fonts = new Fonts();

  this._styles = new Styles();
  this._settings = new Settings();
  this._webSettings = new WebSettings();
};

/**
 * Gets the content types that are specific to the document.
 * @returns {ContentTypes}
 */
Word.prototype.getContentTypes = function() {
  return this._contentTypes;
};

/**
 * Gets the files that should be written out to the package for this document.
 * @returns {[{name: {String}, contents: {Strings}}]}
 */
Word.prototype.getFiles = function() {
  var files;

  // All drawings need to be written out as files
  files = (this._document.getDrawings().map(function(drawing) {
    return {name: 'word/' + drawing.fileLocation, contents: drawing.getContents()};
  }));

  return files.concat([
    {name: Files.Document, contents: this._document.serialize()},
    {name: Files.FontTable, contents: this._fonts.serialize()},
    {name: Files.Rels, contents: this._document.getRelationships().serialize()},
    {name: Files.Styles, contents: this._styles.serialize()},
    {name: Files.Settings, contents: this._settings.serialize()},
    {name: Files.WebSettings, contents: this._webSettings.serialize()}
    // {name: Files.Theme, contents: theme1Xml}
  ]);
};

Word.prototype._addRelationships = function() {
  var rels = this._document.getRelationships();

  rels.add('fontTable.xml', Constants.RelationshipTypes.FontTable);
  rels.add('settings.xml', Constants.RelationshipTypes.Settings);
  rels.add('webSettings.xml', Constants.RelationshipTypes.WebSettings);
  rels.add('styles.xml', Constants.RelationshipTypes.Styles);

  // TODO: (harisiva) Themes are not necessary; add in if helpful
  // rels.add('theme/theme1.xml', Constants.RelationshipTypes.Theme);
};

/**
 * Creates required content types for the document.
 * @private
 */
Word.prototype._createContentTypes = function() {
  // TODO: (harisiva): Add all image content types
  this._contentTypes.addDefault('jpeg', 'image/jpeg');

  this._contentTypes.addOverride('/' + Files.Document, Constants.ContentTypes.WordDocument);
  // TODO: (harisiva): Enable numbering style
  //this._contentTypes.addOverride('/' + Files.Numbering, Constants.ContentTypes.Numbering);
  this._contentTypes.addOverride('/' + Files.Styles, Constants.ContentTypes.Styles);
  this._contentTypes.addOverride('/' + Files.Settings, Constants.ContentTypes.Settings);
  this._contentTypes.addOverride('/' + Files.WebSettings, Constants.ContentTypes.WebSettings);
  this._contentTypes.addOverride('/' + Files.FontTable, Constants.ContentTypes.FontTable);
  // this._contentTypes.addOverride('/' + Files.Theme, Constants.ContentTypes.Theme);
};

module.exports = Word;
