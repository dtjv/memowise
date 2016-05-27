var path = require('path');
var fs = require('fs');

var file = path.join(__dirname, process.argv[2]);
console.log(
  file,
  fs.readFileSync(file, 'utf8')
);
