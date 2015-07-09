"use strict";

let fs = require('fs')
let path = require('path')

let root = 'subjects'

let dirs = fs.readdirSync(root)

dirs.forEach(function(dir) {
  let standards = fs.readdirSync(path.join(root, dir))
  let indexStr = ['module.exports = [']
  standards.forEach(function(standard) {
    indexStr.push('\trequire("./' + standard + '") ,')
  })
  indexStr.push(']\n')
  fs.writeFileSync(path.join(root, dir, 'index.js'), indexStr.join('\n'))
})
