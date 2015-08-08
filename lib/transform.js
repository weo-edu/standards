"use strict";

let R = require('ramda')
let slice = require('sliced')
let transforms = require('./subject-transforms')
let slug = require('slug')

var contentRe = /^\(\+\) /
module.exports = function (standardSet) {
  let subject = standardSet.subject.toLowerCase()
  let subjectTransform = transforms[slug(subject)] || R.identity

  let tags = [subject]
      .concat(titleToTags(standardSet.title))

  let standardsByDepth = {}

  Object.
    keys(standardSet.standards)
    .map(R.prop(R.__, standardSet.standards))
    .forEach(function (standard) {
    if (! standardsByDepth[standard.depth])
      standardsByDepth[standard.depth] = []
    standardsByDepth[standard.depth].push(standard)
  })

  let depth = 0
  while (standardsByDepth[depth])
    depth++

  let standards = []
  let depths = [depth - 2, depth - 1]
  depths.forEach(function(depth) {
    (standardsByDepth[depth] || []).forEach(function(s) {
      let standard = getStandard(s)

      standard.meta = []

      parents(s, standardSet.standards, function(p) {
        p = getStandard(p)
        standard.meta.push(p.content)
        standard.tags = standard.tags
          .concat(p.tags)
          .concat(p.displayName)
          .filter(Boolean)
      })

      standard.tags = standard.tags.concat(tags).map(R.toLower)
      standard.content = standard.content.replace(contentRe, '')
      standard = subjectTransform(standard)

      if (standard && standard.displayName)
        standards.push(standard)
    })

  })

  return standards

}

function getStandard(s) {
  let standard = {}
  standard.displayName = getDisplayName(s)
  standard.content = getContent(s)
  standard.tags = getTags(s)
  return standard
}

function getContent(standard) {
  return standard.description
}

function getDisplayName(standard) {
  return standard.statementNotation || standard.listId
}

function getTags(standard) {
  return []
}

function parents(standard, standards, cb) {
  if (standard.depth === 0)
    return
  standard.ancestorIds.forEach(function(id) {
    cb(standards[id])
  })
}

function titleToTags(title) {
  title = title.toLowerCase()
  if (title.indexOf('grades') === 0) {
    return title.slice('grades'.length).split(',').map(function(grade) {
      return 'grade ' + R.trim(grade)
    })
  } else
    return [title]
}
