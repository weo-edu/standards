"use strict";

let fs = require('fs')
let path = require('path')

let root = 'subjects'

let dirs = fs.readdirSync(root)

dirs.forEach(function(dir) {
  let standards = fs.readdirSync(path.join(root, dir))
  let lines = []
  let l = lines.push.bind(lines)


  l('var standards = [')
  standards.forEach(function(standard, idx) {
    l('  require("./' + standard + '")' + (idx === standards.length - 1 ? '': ','))
  })
  l(']')
  l('standards = standards.concat.apply(standards, standards)')
  l('')
  l('module.exports = standards')

  fs.writeFileSync(path.join(root, dir, 'index.js'), lines.join('\n'))
})
