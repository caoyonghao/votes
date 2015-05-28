'use strict';

var xlsx = require('node-xlsx');
var fs = require('fs');

console.log(__dirname);
var obj = xlsx.parse(__dirname + '/test.xlsx'); // parses a file
console.log(obj[0].data[1])

var data = [[1,2,3],[true, false, null, 'sheetjs'],['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // returns a buffer

fs.writeFileSync('user.xlsx', buffer, 'binary');