var Document = require('./src/word/document'),
    ListNumberingStyles = require('./src/word/style/styles').ListNumberingStyles,
    Package = require('./src/package'),
    Paragraph = require('./src/word/paragraph'),
    Run = require('./src/word/run'),
    RunFormatting = require('./src/word/run').RunFormatting,
    RunStyles = require('./src/word/run').RunStyles,
    Table = require('./src/word/table'),
    Word = require('./src/word/word'),
    fs = require('fs');

var createDocument = function() {
  var document = new Document();

  var table = new Table(2);
  table.addRow(['first - 1', 'first - 2']);
  table.addRow(['second - 1', 'second - 2']);
  document.addChild(table);

  document.addChild(new Paragraph());
  return document;

  var para = new Paragraph();
  para.addRun(new Run({text: 'first text'}));
  para.addRun(new Run({
    text: ' second bold',
    formatting: [RunFormatting.Bold]
  }));
  document.addChild(para);

  document.addChild(new Paragraph());

  para = new Paragraph();
  para.addRun(new Run({
    text: 'Going to go to a new line and try numbering and bullets.',
    formatting: [RunFormatting.Italics, RunFormatting.Underline]
  }));
  document.addChild(para);

  document.addChild(new Paragraph());

  para = new Paragraph();
  para.addRun(new Run({
    text: 'Heading text',
    style: RunStyles.Heading1
  }));
  document.addChild(para);

  document.addChild(new Paragraph());

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyles.Numbers);
  para.addRun(new Run({text: 'Line 1.'}));
  document.addChild(para);

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyles.Numbers);
  para.addRun(new Run({text: 'Line 2.'}));
  document.addChild(para);

  document.addChild(new Paragraph());

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyles.Bullet);
  para.addRun(new Run({text: 'Line 1.'}));
  document.addChild(para);

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyles.Bullet);
  para.addRun(new Run({text: 'Line 2.'}));
  document.addChild(para);

  return document;
};

if (require.main === module) {
  var document = createDocument();

  var word = new Word(document);

  var pack = new Package(word);
  zip = pack.createZip();

  var buffer = zip.generate({type:"nodebuffer"});
  fs.writeFile("./testdoc/test/test.zip", buffer, function(err) {
    if (err) throw err;
  });

  fs.writeFile("./testdoc/test.docx", buffer, function(err) {
    if (err) throw err;
  });
}
