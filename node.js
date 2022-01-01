const fs = require('fs');
const fileName = '/var/www/html/file.json';
const file = require(fileName);

file.template = "template-1";
file.text = "qwerty";

fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});