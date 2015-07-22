var grades = require('@weo-edu/grades/lib/utils')

module.exports = function(tags) {
  var gradeEq = []
  tags.forEach(function(tag) {
    if (grades.isGrade(tag)) {
      gradeEq = gradeEq.concat(grades.synonyms(tag))
    }
  })
  return tags.concat(gradeEq)
}
