
var prefix = /^CCSS.ELA-Literacy\./g
exports['english-language-arts-and-literacy'] = function(standard) {
  standard.displayName = (standard.displayName || '').replace(prefix, '')
  return standard
}
