'use strict';
var $ = require('../internals/export');
var toIndexedObject = require('../internals/to-indexed-object');
var arraySlice = require('../internals/array-slice');
var arrayToSpliced = require('../internals/array-to-spliced');
var addToUnscopables = require('../internals/add-to-unscopables');

var $Array = Array;

// `Array.prototype.toSpliced` method
// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toSpliced
$({ target: 'Array', proto: true, arity: 2 }, {
  // eslint-disable-next-line no-unused-vars -- required for .length
  toSpliced: function toSpliced(start, deleteCount /* , ...items */) {
    return arrayToSpliced(toIndexedObject(this), $Array, arraySlice(arguments));
  }
});

addToUnscopables('toSpliced');
