'use strict';
module.exports = function () {
  var math = Object.create(Math);

  math.factory = function (a) {
    if (typeof a !== 'number') {
      throw new TypeError('built-in math factory only accepts numbers');
    }
    return Number(a);
  };

  math.add = function (a, b) {
    return a + b;
  };
  math.sub = function (a, b) {
    return a - b;
  };
  math.mul = function (a, b) {
    return a * b;
  };
  math.div = function (a, b) {
    return a / b;
  };
  math.mod = function (a, b) {
    return a % b;
  };

  // unary
  math.negative = function (a) {
    return -a;
  };
  math.positive = function (a) {
    return a;
  };

  // relational
  math.lessThan = function (a, b) {
    return a < b;
  };
  math.lessEqualThan = function (a, b) {
    return a <= b;
  };
  math.greaterThan = function (a, b) {
    return a > b;
  };
  math.greaterEqualThan = function (a, b) {
    return a >= b;
  };
  math.equal = function (a, b) {
    /* eslint-disable */
    return a == b;
    /* eslint-enable*/
  };
  math.strictlyEqual = function (a, b) {
    return a === b;
  };
  math.notEqual = function (a, b) {
    /* eslint-disable */
    return a != b;
    /* eslint-enable*/
  };
  math.strictlyNotEqual = function (a, b) {
    return a !== b;
  };

  // shift
  math.shiftRight = function (a, b) {
    return (a >> b);
  };
  math.shiftLeft = function (a, b) {
    return (a << b);
  };
  math.unsignedRightShift = function (a, b) {
    return (a >>> b);
  };

  // logical
  math.or = function (a, b) {
    /* eslint-disable */
    return a | b;
    /* eslint-enable*/
  };
  math.and = function (a, b) {
    /* eslint-disable */
    return a & b;
    /* eslint-enable*/
  };

  return math;
};
