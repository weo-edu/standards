var merge = require("./lib/utils").merge
module.exports = merge([
  require("./subjects/mathematics"),
  require("./subjects/science"),
  require("./subjects/english-language-arts-and-literacy"),
])