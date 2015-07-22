'use strict'
module.exports = function () {
  var math = Object.create(Math)

  math.factory = function (a) {
    if (typeof a !== 'number') {
      throw new TypeError('built-in math factory only accepts numbers')
    }
    return Number(a)
  }

  math.add = function (a, b) {
    return a + b
  }
  math.sub = function (a, b) {
    return a - b
  }
  math.mul = function (a, b) {
    return a * b
  }
  math.div = function (a, b) {
    return a / b
  }
  math.mod = function (a, b) {
    return a % b
  }
  math.factorial = function (a) {
    var res = 1
    for (var i = 2; i <= a; i += 1) {
      res *= i
    }
    return res
  }

  // logical
  math.logicalOR = function (a, b) {
    return a || b
  }
  math.logicalXOR = function (a, b) {
    /* eslint-disable */
    return a != b
    /* eslint-enable*/
  }
  math.logicalAND = function (a, b) {
    return a && b
  }

  // bitwise
  math.bitwiseOR = function (a, b) {
    /* eslint-disable */
    return a | b
    /* eslint-enable*/
  }
  math.bitwiseXOR = function (a, b) {
    /* eslint-disable */
    return a ^ b
    /* eslint-enable*/
  }
  math.bitwiseAND = function (a, b) {
    /* eslint-disable */
    return a & b
    /* eslint-enable*/
  }

  // relational
  math.lessThan = function (a, b) {
    return a < b
  }
  math.lessEqualThan = function (a, b) {
    return a <= b
  }
  math.greaterThan = function (a, b) {
    return a > b
  }
  math.greaterEqualThan = function (a, b) {
    return a >= b
  }
  math.equal = function (a, b) {
    /* eslint-disable */
    return a == b
  /* eslint-enable*/
  }
  math.strictlyEqual = function (a, b) {
    return a === b
  }
  math.notEqual = function (a, b) {
    /* eslint-disable */
    return a != b
  /* eslint-enable*/
  }
  math.strictlyNotEqual = function (a, b) {
    return a !== b
  }

  // shift
  math.shiftRight = function (a, b) {
    return (a >> b)
  }
  math.shiftLeft = function (a, b) {
    return (a << b)
  }
  math.unsignedRightShift = function (a, b) {
    return (a >>> b)
  }

  // unary
  math.negative = function (a) {
    return -a
  }
  math.positive = function (a) {
    return a
  }

  return math
}
