'use strict'

const CodeGenerator = require('math-codegen')
const math = require('./adapter')()

function processScope (scope) {
  Object.keys(scope).forEach(function (k) {
    const value = scope[k]
    scope[k] = math.factory(value)
  })
}

module.exports = function (expression) {
  return new CodeGenerator()
    .setDefs({
      $$processScope: processScope
    })
    .parse(expression)
    .compile(math)
}

module.exports.math = math
