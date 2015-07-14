exports.merge = function(arr) {
  var merged = []
  return merged.concat.apply(merged, arr)
}
