
var xlsx = require('node-xlsx');
var fs = require('fs');

console.log(__dirname);
var obj = xlsx.parse(__dirname + '/test.xlsx'); // parses a file
console.log(obj[0].data[1])

var data = [["name", "id", "remark"]];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // returns a buffer

fs.writeFileSync('test.xlsx', buffer, 'binary');