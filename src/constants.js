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
      Settings: 'word/settings.xml',
      Styles: 'word/styles.xml',
      Theme: 'word/theme/theme1/xml',
      WebSettings: 'word/webSettings.xml',
      Rels: 'word/_rels/document.xml.rels'
    }
  },

  ContentTypes: {
    WordDocument: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml',
    Numbering: 'application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml',
    Styles: 'application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml',
    Settings: 'application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml',
    WebSettings: 'application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml',
    FontTable: 'application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml',
    Theme: 'application/vnd.openxmlformats-officedocument.theme+xml',
    CoreProperties: 'application/vnd.openxmlformats-package.core-properties+xml',
    ExtendedProperties: 'application/vnd.openxmlformats-officedocument.extended-properties+xml',
    Relationships: 'application/vnd.openxmlformats-package.relationships+xml'
  },

  XmlNamespaces: {
    ExtendedProps: 'http://schemas.openxmlformats.org/officeDocument/2006/extended-properties',
    cp: 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties',
    dc: 'http://purl.org/dc/elements/1.1/',
    dcterms: 'http://purl.org/dc/terms/',
    dcmitype: 'http://purl.org/dc/dcmitype/',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    vt: 'http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes',
    mc: 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    w: 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    w14: 'http://schemas.microsoft.com/office/word/2010/wordml',
    w15: 'http://schemas.microsoft.com/office/word/2012/wordml'
  }
};

module.exports = Constants;
