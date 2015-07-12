var standards = [
  require("./subjects/mathematics"),
  require("./subjects/science"),
  require("./subjects/english-language-arts-and-literacy"),
]
standards = standards.concat.apply(standards, standards)

module.exports = standards