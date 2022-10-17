"use strict";
exports.__esModule = true;
exports.createRandomData = void 0;
var getRandomElement = function (dataArray) {
    var randomIndex = Math.floor(Math.random() * dataArray.length);
    return dataArray[randomIndex];
};
var createObjectKeysWithRandomData = function (randomData) {
    var storedObj = {};
    for (var _i = 0, randomData_1 = randomData; _i < randomData_1.length; _i++) {
        var _a = randomData_1[_i], key = _a.key, possibleValues = _a.possibleValues;
        var data = getRandomElement(possibleValues);
        storedObj[key] = data;
    }
    return storedObj;
};
var createRandomData = function (randomData, amount) {
    var storedData = [];
    for (var i = 0; i < amount; i++) {
        var random = createObjectKeysWithRandomData(randomData);
        storedData.push(random);
    }
    return storedData;
};
exports.createRandomData = createRandomData;
