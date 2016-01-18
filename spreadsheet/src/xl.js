var Constants = require('oxml-base').Constants,
    ContentTypes = require('oxml-base').ContentTypes,
    Files = require('oxml-base').Constants.Spreadsheet.Files,
    Stylesheet = require('./stylesheet'),
    Xml = require('oxml-base').Xml;

/**
 * Creates a new instance of a spreadsheet file.
 * @constructor
 */
var Xl = function(workbook) {
  this.type = Constants.DocumentTypes.Spreadsheet;

  this._workbook = workbook;
};

/**
 * Gets the list of files that should be added into the package.
 */
Xl.prototype.getFiles = function() {
  var files = [
    {name: Files.Document, contents: this._workbook.serialize()},
    {name: Files.Styles, contents: Xml.element('styleSheet', Stylesheet)},
    {name: Files.Rels, contents: this._workbook.getRelationships().serialize()}
  ];

  // All sheets in the workbook
  this._workbook.getSheets().forEach(function(sheet) {
    files.push({name: 'xl/worksheets/' + sheet.getFilename(), contents: sheet.serialize()});

    // It there are rels in the sheet, write those out too
    var rels = sheet.getRelationships();
    if (rels.rels.length > 0) {
      files.push({name: 'xl/worksheets/_rels/' + sheet.name + '.xml.rels', contents: rels.serialize()})
    }

    // Tables in the sheet
    sheet.getTables().forEach(function(table) {
      files.push({name: 'xl/tables/' + table.getFilename(), contents: table.serialize()});
    });
  });

  return files;
};

/**
 * Gets all the content types that should be included in the document.
 * @returns {ContentTypes}
 */
Xl.prototype.getContentTypes = function() {
  var contentTypes = new ContentTypes();

  contentTypes.addDefault('jpeg', 'image/jpeg');

  contentTypes.addOverride('/' + Files.Document, Constants.ContentTypes.SpreadsheetDocument);
  contentTypes.addOverride('/' + Files.Styles, Constants.ContentTypes.Styles);

  // Get all sheets, and all tables
  this._workbook.getSheets().forEach(function(sheet) {
    contentTypes.addOverride('/xl/worksheets/' + sheet.getFilename(), Constants.ContentTypes.Worksheet);

    sheet.getTables().forEach(function(table) {
      contentTypes.addOverride('/xl/tables/' + table.getFilename(), Constants.ContentTypes.SpreadsheetTable);
    });
  });

  return contentTypes;
};

module.exports = Xl;
