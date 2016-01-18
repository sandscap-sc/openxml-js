var Document = require('./src/wordprocessing/document'),
    ListNumberingStyles = require('./src/wordprocessing/style/styles').ListNumberingStyles,
    Package = require('./src/package'),
    Paragraph = require('./src/wordprocessing/paragraph'),
    Run = require('./src/wordprocessing/run'),
    RunFormatting = require('./src/wordprocessing/run').RunFormatting,
    Styles = require('./src/wordprocessing/style/styles'),
    Table = require('./src/wordprocessing/table'),
    Word = require('./src/wordprocessing/word'),
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
