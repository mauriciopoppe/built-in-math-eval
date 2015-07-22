# built-in-math-eval 

[![Build Status][travis-image]][travis-url] 
[![NPM][npm-image]][npm-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Stability](https://img.shields.io/badge/stability-unstable-yellow.svg)]()

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

> Evaluate mathematical expression with the built-in math object

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Description](#description)
- [Installation](#installation)
- [API](#api)
  - [`code = compile(expression)`](#code--compileexpression)
    - [`return.eval([scope])`](#returnevalscope)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

This module evaluates the generated code from [math-codegen](https://github.com/maurizzzio/math-codegen)
for the built in `Math` namespace providing the necessary adapter methods

## Installation

```sh
$ npm install --save built-in-math-eval
```

## API

```javascript
var compile = require('built-in-math-eval');
```

### `code = compile(expression)`

**params**
* `expression` {string} the expression to be parsed

**returns** {Object}
* `return.eval` {function} The compiled function to be called with some scope variables

#### `return.eval([scope])`

**params**
* `scope` {Object} 

An optional object which holds some variables to be used in the expression,
all variables are casted to `Number`

**returns** {*} a number or a boolean value depending on the operation made

## Examples

Also have a look at [test/index.js](https://github.com/maurizzzio/built-in-math-eval/blob/master/test/index.js)

```javascript
var compile = require('built-in-math-eval');

// > 3
compile('1 + 2').eval()

// > 8
compile('2^3').eval()

// > 8
compile('x^3').eval({ x: 2 })

// > 1
compile('cos(x)').eval({ x: 0 })

// > 8
compile('2x^2').eval({ x: 2 })

// > 3.1415
compile('PI').eval()
```

2015 © Mauricio Poppe

[npm-image]: https://img.shields.io/npm/v/built-in-math-eval.svg?style=flat
[npm-url]: https://npmjs.org/package/built-in-math-eval
[travis-image]: https://travis-ci.org/maurizzzio/built-in-math-eval.svg?branch=master
[travis-url]: https://travis-ci.org/maurizzzio/built-in-math-eval
[coveralls-image]: https://coveralls.io/repos/maurizzzio/built-in-math-eval/badge.svg
[coveralls-url]: https://coveralls.io/r/maurizzzio/built-in-math-eval
