var xlsx = require('node-xlsx');
var fs = require('fs');
//constant
var FILE_NAME = 'data.xlsx', ID_INDEX = 1;
//cache
var bookingCache;

function init() {
    if (!bookingCache) {
        bookingCache = readXlsx();
        console.log(bookingCache);
    }
}

function addRecord(info) {
    if (!info || info && !info[ID_INDEX]) {
        console.log("xlsxManager::addRecord::ERROR INVALID PARAM");
        return "invalid_param";
    }
    if (isExist(info)) {
        console.log("xlsxManager::addRecord::ERROR INFO IS EXIST");
        return "is_exist";
    }
    bookingCache.push(info);
    writeToFile();
    return "success";
}

function isExist(info) {
    for (var i = 1; i < bookingCache.length; i++) {
        if (info[ID_INDEX] == bookingCache[i][ID_INDEX]) {
            return true;
        }
    }
    return false;
}

function readXlsx() {
    return xlsx.parse(__dirname + "/" + FILE_NAME)[0].data;
}

function getInfo() {
    return bookingCache;
}
function writeToFile() {
    console.log(bookingCache);
    var buffer = xlsx.build([{name: "booking", data: bookingCache}]);
    fs.writeFileSync(__dirname + "/" + FILE_NAME, buffer, 'binary');
}

exports.init = init;
exports.add = addRecord;
exports.get = getInfo;