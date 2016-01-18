var Constants = {
  DocumentTypes: {
    Word: 'Word',
    Spreadsheet: 'Spreadsheet'
  },

  Files: {
    CoreProps: 'docProps/core.xml',
    ExtendedProps: 'docProps/app.xml',
    ContentTypes: '[Content_Types].xml',
    PackageRels: '_rels/.rels'
  },

  Word: {
    Files: {
      Document: 'word/document.xml',
      FontTable: 'word/fontTable.xml',
      Numbering: 'word/numbering.xml',
      Rels: 'word/_rels/document.xml.rels',
      Settings: 'word/settings.xml',
      Styles: 'word/styles.xml',
      Theme: 'word/theme/theme1.xml',
      WebSettings: 'word/webSettings.xml'
    }
  },

  Spreadsheet: {
    Files: {
      Document: 'xl/workbook.xml',
      Rels: 'xl/_rels/workbook.xml.rels',
      SharedStrings: 'xl/sharedStrings.xml',
      Styles: 'xl/styles.xml'
    }
  },

  ContentTypes: {
    WordDocument: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml',
    SpreadsheetDocument: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml',
    Numbering: 'application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml',
    Styles: 'application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml',
    Settings: 'application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml',
    WebSettings: 'application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml',
    FontTable: 'application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml',
    Theme: 'application/vnd.openxmlformats-officedocument.theme+xml',
    CoreProperties: 'application/vnd.openxmlformats-package.core-properties+xml',
    ExtendedProperties: 'application/vnd.openxmlformats-officedocument.extended-properties+xml',
    Relationships: 'application/vnd.openxmlformats-package.relationships+xml',
    SpreadsheetTable: 'application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml',
    Worksheet: 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml'
  },

  RelationshipTargetModes: {
    External: 'External',
    Internal: 'Internal'
  },

  RelationshipTypes: {
    CoreProps: 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties',
    ExtendedProps: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties',
    FontTable: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable',
    HyperLink: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',
    Image: 'http://schemas.microsoft.com/office/2006/relationships/image',
    Numbering: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering',
    OfficeDoc: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument',
    Settings: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings',
    Styles: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles',
    Table: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/table',
    Theme: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme',
    WebSettings: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings',
    Worksheet: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet'
  },

  XmlNamespaces: {
    ExtendedProps: 'http://schemas.openxmlformats.org/officeDocument/2006/extended-properties',
    cp: 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties',
    dc: 'http://purl.org/dc/elements/1.1/',
    dcterms: 'http://purl.org/dc/terms/',
    dcmitype: 'http://purl.org/dc/dcmitype/',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    vt: 'http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes',
    m: 'http://schemas.openxmlformats.org/officeDocument/2006/math',
    mc: 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    mo: 'http://schemas.microsoft.com/office/mac/office/2008/main',
    mv: 'urn:schemas-microsoft-com:mac:vml',
    o: 'urn:schemas-microsoft-com:office:office',
    r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    sml: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
    sl: 'http://schemas.openxmlformats.org/schemaLibrary/2006/main',
    v: 'urn:schemas-microsoft-com:vml',
    w: 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    w10: 'urn:schemas-microsoft-com:office:word',
    w14: 'http://schemas.microsoft.com/office/word/2010/wordml',
    w15: 'http://schemas.microsoft.com/office/word/2012/wordml',
    wne: 'http://schemas.microsoft.com/office/word/2006/wordml',
    wp: 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
    wp14: 'http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing',
    wpc: 'http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas',
    wpg: 'http://schemas.microsoft.com/office/word/2010/wordprocessingGroup',
    wpi: 'http://schemas.microsoft.com/office/word/2010/wordprocessingInk',
    wps: 'http://schemas.microsoft.com/office/word/2010/wordprocessingShape',
    x14ac: 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac',
    x15: 'http://schemas.microsoft.com/office/spreadsheetml/2010/11/main'
  }
};

module.exports = Constants;
