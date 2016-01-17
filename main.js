var Document = require('./src/word/document'),
    Package = require('./src/package'),
    Paragraph = require('./src/word/paragraph'),
    Run = require('./src/word/run'),
    Word = require('./src/word/word'),
    fs = require('fs');

var createDocument = function() {
  var document = new Document();

  var para = new Paragraph();
  para.addRun(new Run({text: 'first text'}));
  //para.addRun(new Run({text: ' second bold'}, [RunStyles.Bold]));
  document.addPara(para);

  return document;

  para = new Paragraph();
  para.addRun(new Run({text: 'Going to go to a new line and try numbering and bullets.'}));
  document.addPara(para);

  document.addPara(new Paragraph());

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyle.Numbers);
  para.addRun(new Run({text: 'Line 1.'}));
  document.addPara(para);

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyle.Numbers);
  para.addRun(new Run({text: 'Line 2.'}));
  document.addPara(para);

  document.addPara(new Paragraph());

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyle.Bullet);
  para.addRun(new Run({text: 'Line 1.'}));
  document.addPara(para);

  para = new Paragraph();
  para.styleAsList(0, ListNumberingStyle.Bullet);
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
