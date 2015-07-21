
var prefix = /^CCSS.ELA-Literacy\./g
exports['english-language-arts-and-literacy'] = function(standard) {
  standard.displayName = (standard.displayName || '').replace(prefix, '')


  //Dedupe k-12 standards
  if (standard.displayName.indexOf('R.CCR') === 0
    || standard.displayName.indexOf('L.CCR') === 0
    || standard.displayName.indexOf('W.CCR') === 0
    || standard.displayName.indexOf('SL.CCR') === 0) {
    if (standard.tags.indexOf('grade k') >= 0) {
      standard.tags = standard.tags.concat([
        'grade 1',
        'grade 2',
        'grade 3',
        'grade 4',
        'grade 5',
        'grade 6',
        'grade 7',
        'grade 8',
        'grade 9',
        'grade 10',
        'grade 11',
        'grade 12'
        ])
    } else {
      return null
    }
  }

  //Dedupe 6-8 standards
  if (standard.displayName.indexOf('WHST.6-8') === 0
    || standard.displayName.indexOf('RST.6-8') === 0
    || standard.displayName.indexOf('RH.6-8') === 0) {
    if (standard.tags.indexOf('grade 6') >= 0) {
      standard.tags = standard.tags.concat([
        'grade 7',
        'grade 8'
        ])
    } else {
      return null
    }
  }

  return standard
}


var prefix = /^K-2/
exports['science'] = function(standard) {
  if (standard.displayName.indexOf('K-2') === 0) {
    if (standard.tags.indexOf('grade k') >= 0) {
      standard.tags = standard.tags.concat(['grade 1', 'grade 2'])
    } else {
      return null
    }
  }

  if (standard.displayName.indexOf('3-5') === 0) {
    if (standard.tags.indexOf('grade 3') >= 0) {
      standard.tags = standard.tags.concat(['grade 4', 'grade 5'])
    } else {
      return null
    }
  }

  return standard
}
