/* eslint-env jest */

const assert = require('assert')
const compile = require('../')
let exp

function cleanAssert (a, b) {
  assert(a && a.code)
  a = a.code.replace(/\s/g, '')
  b = b.replace(/\s/g, '')
  assert(a.indexOf(b) >= 0)
}

describe('interval arithmetic evaluator', function () {
  describe('with literals', function () {
    it('should cast constants', function () {
      exp = compile('0')
      cleanAssert(exp, 'ns.factory(0)')
      assert.equal(exp.eval(), 0)

      exp = compile('1')
      cleanAssert(exp, 'ns.factory(1)')
      assert.equal(exp.eval(), 1)
    })

    it('should not cast arrays as interval', function () {
      exp = compile('[-2, 3]')
      cleanAssert(exp, 'ns.factory([-2, 3])')
      assert.throws(function () {
        assert.equal(exp.eval())
      })
    })
  })

  describe('with identifiers', function () {
    it('should cast interval arithmetic built-in functions', function () {
      exp = compile('add(1, 2)')
      assert.equal(exp.eval(), 3)
      exp = compile('sub(2, 3)')
      assert.equal(exp.eval(), -1)
      exp = compile('mul(2, 3)')
      assert.equal(exp.eval(), 6)
      exp = compile('div(2, 3)')
      assert.equal(exp.eval(), 2 / 3)
      exp = compile('pow(2, 3)')
      assert.equal(exp.eval(), 8)
      exp = compile('mod(2, 3)')
      assert.equal(exp.eval(), 2)
    })

    it('should compile scope stored variables', function () {
      exp = compile('x')

      let scope
      scope = { x: 1 }
      assert.equal(exp.eval(scope), 1)
      assert.equal(scope.x, 1)

      assert.throws(function () {
        scope = { x: [-1, 2] }
        assert.equal(exp.eval(scope), [-1, 2])
        assert.equal(scope.x, [-1, 2])
      })
    })

    it('should throw on undefined functions', function () {
      assert.throws(function () {
        exp = compile('nope(3)')
        exp.eval()
      })
    })
  })

  describe('with unary operators', function () {
    it('should negate an interval', function () {
      // negative
      exp = compile('-1')
      assert.equal(exp.eval(), -1)
    })

    it('should apply it multiple times', function () {
      exp = compile('-+-1')
      assert.equal(exp.eval(), 1)
    })
  })

  describe('with binary operators', function () {
    it('should compute interval addition/subtraction', function () {
      exp = compile('1 + 2')
      assert.equal(exp.eval(), 3)

      exp = compile('1 - 2')
      assert.equal(exp.eval(), -1)
    })

    it('should compute interval powers', function () {
      exp = compile('1^2')
      assert.equal(exp.eval(), 1)

      exp = compile('3^2')
      assert.equal(exp.eval(), 9)

      exp = compile('x^2')
      assert.equal(exp.eval({ x: 2 }), 4)
      assert.equal(exp.eval({ x: -1 }), 1)

      exp = compile('3 + x^2')
      assert.equal(exp.eval({ x: 2 }), 7)
      assert.equal(exp.eval({ x: -1 }), 4)
    })
  })

  describe('with misc operations', function () {
    it('should compute random operations', function () {
      exp = compile('cos(0)')
      assert.equal(exp.eval(), 1)

      exp = compile('abs(-1)')
      assert.equal(exp.eval(), 1)

      exp = compile('nthRoot(-8, 3)')
      assert.equal(exp.eval(), -2)

      assert.equal(compile('1 < 2').eval(), true)
      assert.equal(compile('1 <= 2').eval(), true)
      assert.equal(compile('2 > 2').eval(), false)
      assert.equal(compile('2 >= 2').eval(), true)
      assert.equal(compile('2 == 2').eval(), true)
      assert.equal(compile('2 === 2').eval(), true)
      assert.equal(compile('2 != 2').eval(), false)
      assert.equal(compile('2 !== 2').eval(), false)
      assert.equal(compile('8 >> 2').eval(), 2)
      assert.equal(compile('1 << 2').eval(), 4)
      assert.equal(compile('-1 >>> 0').eval(), 4294967295)
      assert.equal(compile('2 | 1').eval(), 3)
      assert.equal(compile('2 & 1').eval(), 0)
      assert.equal(compile('2 & 1').eval(), 0)
      assert.equal(compile('PI').eval(), Math.PI)
    })

    it('should compute the square root of a number', function () {
      exp = compile('sqrt(4)')
      assert.equal(exp.eval(), 2)

      exp = compile('sqrt(x)')
      assert.equal(exp.eval({ x: 4 }), 2)
    })

    it('should compile complex expressions', function () {
      exp = compile('sqrt(2)^2')
      assert(Math.abs(exp.eval() - 2) < 1e-7)

      exp = compile('sqrt(x)^2')
      assert(Math.abs(exp.eval({ x: 2 }) - 2) < 1e-7)

      exp = compile('1 / x')
      assert.equal(exp.eval({ x: 0 }), Infinity)

      exp = compile('x / y')
      assert.equal(exp.eval({ x: 2, y: 3 }), 2 / 3)

      exp = compile('sin(exp(x))')
      assert.equal(exp.eval({ x: 1 }), 0.41078129050290885)

      exp = compile('2x^2')
      assert.equal(exp.eval({ x: 2 }), 8)

      exp = compile('2^3^4')
      // 2^81
      // (2^40)^2 * 2
      // ((2^20)^2)^2 * 2
      assert.equal(exp.eval(), ((1 << 20) * (1 << 20)) * (1 << 20) * (1 << 20) * 2)
    })
  })

  describe('assignment', function () {
    it('should update a property of the scope', function () {
      const scope = { x: 1 }
      compile('y = x').eval(scope)
      assert.equal(scope.x, scope.y)
    })
  })

  describe('block', function () {
    it('should update a property of the scope', function () {
      const scope = { x: 1 }
      const exp = compile('y = 1 + x; y + 1')
      const res = exp.eval(scope)
      assert.equal(res, 3)
      assert.equal(scope.x, 1)
      assert.equal(scope.y, 2)
    })
  })

  describe('conditional', function () {
    it('should work with the ternary operator', function () {
      let res, exp, scope
      scope = { x: 1 }
      exp = compile('x < 2 ? 1 : 2')
      res = exp.eval(scope)
      assert.equal(res, 1)

      scope = { x: 1 }
      exp = compile('x > 2 ? 1 : 2')
      res = exp.eval(scope)
      assert.equal(res, 2)
    })
  })
})
