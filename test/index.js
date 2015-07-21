var allTags = require('..')
var assert = require('assert')

var Tag = require('@weo-edu/schema-tag')
var validator = require('@weo-edu/validate')
var validateTag = validator(Tag)


describe('subjects', function () {
  it('should all be valid tags', function() {
    allTags.forEach(function(tag) {
      var validation = validateTag(tag)
      assert(validation.valid)
    })
  })

  var tags = {}
  it('should not have duplicate displayNames', function() {
    allTags.forEach(function (tag) {
      assert(!tags[tag.displayName])
      tags[tag.displayName] = tag
    })
  })

})
