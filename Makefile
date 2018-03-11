#Makefile

run: install
	node index.js

install:
	npm install

test:
	@./node_modules/.bin/mocha

.PHONY: test

tests:
	npm test
