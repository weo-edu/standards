#
# Vars
#

BIN = node ./bin
NODEBIN = ./node_modules/.bin

#
# Tasks
#

node_modules: package.json
	@npm install

build: clean node_modules
	@${BIN}/scrape.js
	@${BIN}/indexes.js

test: node_modules
	@${NODEBIN}/mocha --reporter spec

clean:
	@rm -rf subjects

.PHONY: build clean test
