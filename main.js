var Document = require('./src/word/document'),
    Package = require('./src/package'),
    fs = require('fs');

if (require.main === module) {
  var document = new Document();

  var pack = new Package(document);
  zip = pack.createZip();

  var buffer = zip.generate({type:"nodebuffer"});
  fs.writeFile("./test/test.zip", buffer, function(err) {
    if (err) throw err;
  });
}
