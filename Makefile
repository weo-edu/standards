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

clean:
	@rm -rf subjects

.PHONY: build
