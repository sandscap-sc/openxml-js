var Document = require('oxml-wordprocessing').Document,
    ListNumberingStyles = require('oxml-wordprocessing').Styles.ListNumberingStyles,
    Package = require('oxml-document').Package,
    Paragraph = require('oxml-wordprocessing').Paragraph,
    Run = require('oxml-wordprocessing').Run,
    RunFormatting = require('oxml-wordprocessing').Run.RunFormatting,
    Styles = require('oxml-wordprocessing').Styles,
    Table = require('oxml-wordprocessing').Table,
    Word = require('oxml-wordprocessing').Word,
    Workbook = require('oxml-spreadsheet').Workbook,
    WorksheetTable = require('oxml-spreadsheet').Table,
    Xl = require('oxml-spreadsheet').Xl,
    fs = require('fs');

var createDocument = function() {
  var document = new Document();

  document.addHyperlink('www.google.com');
  //return document;

  var table = new Table(2);
  table.addRow(['first - 1', 'first - 2']);
  table.addRow(['second - 1', 'second - 2']);
  document.addTable(table);

  document.addPara(new Paragraph());

  var para = new Paragraph();
  para.addRun(new Run({text: 'first text'}));
  para.addRun(new Run({
    text: ' second bold',
    formatting: [RunFormatting.Bold]
  }));
  document.addPara(para);

  document.addPara(new Paragraph());

  para = new Paragraph();
  para.addRun(new Run({
    text: 'Going to go to a new line and try numbering and bullets.',
    formatting: [RunFormatting.Italics, RunFormatting.Underline]
  }));
  document.addPara(para);

  document.addPara(new Paragraph());

  para = new Paragraph();
  para.addRun(new Run({
    text: 'Heading text',
    style: Styles.CharacterStyles.Heading1
  }));
  document.addPara(para);

  document.addPara(new Paragraph());

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyles.Numbers);
  para.addRun(new Run({text: 'Line 1.'}));
  document.addPara(para);

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyles.Numbers);
  para.addRun(new Run({text: 'Line 2.'}));
  document.addPara(para);

  document.addPara(new Paragraph());

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyles.Bullet);
  para.addRun(new Run({text: 'Line 1.'}));
  document.addPara(para);

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyles.Bullet);
  para.addRun(new Run({text: 'Line 2.'}));
  document.addPara(para);

  return document;
};

var testDocx = function() {
  var document = createDocument();
  var word = new Word(document);

  var pack = new Package(word);
  var zip = pack.createZip();

  var buffer = zip.generate({type:"nodebuffer"});
  fs.writeFile("./testdoc/test/test.zip", buffer, function(err) {
    if (err) throw err;
  });

  fs.writeFile("./testdoc/test.docx", buffer, function(err) {
    if (err) throw err;
  });
};

var createWorkbook = function() {
  var workbook = new Workbook();

  var sheet1 = workbook.addSheet('sheet1');
  var sheet2 = workbook.addSheet('sheet2');
  var sheet3 = workbook.addSheet('sheet3');

  // First row of the table is column names
  var columnNames = ['Column 1', 'Column 2', 'Column 3'];
  sheet3.addRow(columnNames);

  for (var i = 0; i < 100; i++) {
    sheet3.addRow(['a' + i, 'b' + i, 'c' + i]);
  }

  sheet3.addRow(['d<', 'e>', "f'"]);

  var table1 = new WorksheetTable(
    {
      id: 1,
      name: 'table1',
      displayName: 'Table_1'
    },
    sheet3.getCellRange(),
    columnNames);

  sheet3.addTable(table1);

  return workbook;
};

var testSpreadsheet = function() {
  var workbook = createWorkbook();
  var xl = new Xl(workbook);

  var pack = new Package(xl);
  var zip = pack.createZip();

  var buffer = zip.generate({type:"nodebuffer"});
  fs.writeFile("./testsheet/test/test.zip", buffer, function(err) {
    if (err) throw err;
  });

  fs.writeFile("./testsheet/test.xlsx", buffer, function(err) {
    if (err) throw err;
  });
};

if (require.main === module) {
  testSpreadsheet();
}
