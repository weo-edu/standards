#
# Vars
#

BIN = node ./bin

#
# Tasks
#

node_modules: package.json
	@npm install

build: node_modules
	@${BIN}/scrape.js
	@${BIN}/indexes.js

validate:
	@${BIN}/validate.js

clean:
	@rm -rf subjects

.PHONY: build
