var standards = [
  require("./grade-1.json"),
  require("./grade-2.json"),
  require("./grade-3.json"),
  require("./grade-4.json"),
  require("./grade-5.json"),
  require("./grade-6.json"),
  require("./grade-7.json"),
  require("./grade-8.json"),
  require("./grade-k.json"),
  require("./grades-11-12.json"),
  require("./grades-9-10.json"),
]
standards = standards.concat.apply(standards, standards)

module.exports = standards