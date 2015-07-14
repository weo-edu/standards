"use strict";

let fs = require('fs')
let path = require('path')

let subjects = require('../lib/subjects')

let root = 'subjects'
let utils = './lib/utils'

let dirs = fs.readdirSync(root)

dirs.forEach(function(dir) {
  makeIndex(path.join(root, dir, 'index.js'), fs.readdirSync(path.join(root, dir)))
})

makeIndex('./index.js', subjects.map(function(subject) {
  return path.join(root, subject)
}))


function makeIndex(location, requires) {
  let lines = []
  let l = lines.push.bind(lines)

  var utilsRel = path.relative(path.dirname(location), utils)
  if (utilsRel.indexOf('.') !== 0)
    utilsRel = './' + utilsRel
  l('var merge = require("' + utilsRel + '").merge')
  l('module.exports = merge([')
  requires.forEach(function(requires, idx) {
    l('  require("./' + requires + '")' + (idx === requires.length - 1 ? '': ','))
  })
  l('])')
  fs.writeFileSync(location, lines.join('\n'))
}
