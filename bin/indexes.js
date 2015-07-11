"use strict";

let fs = require('fs')
let path = require('path')

let subjects = require('../lib/subjects')

let root = 'subjects'

let dirs = fs.readdirSync(root)

dirs.forEach(function(dir) {
  makeIndex(path.join(root, dir, 'index.js'), fs.readdirSync(path.join(root, dir)))
})

makeIndex('./index.js', subjects.map(function(subject) {
  return path.join(root, subject)
}))


function makeIndex(path, requires) {
  let lines = []
  let l = lines.push.bind(lines)
  l('var standards = [')
  requires.forEach(function(requires, idx) {
    l('  require("./' + requires + '")' + (idx === requires.length - 1 ? '': ','))
  })
  l(']')
  l('standards = standards.concat.apply(standards, standards)')
  l('')
  l('module.exports = standards')
  fs.writeFileSync(path, lines.join('\n'))
}
