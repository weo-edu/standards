"use strict";

require('es6-promise').polyfill()
let fetch = require('isomorphic-fetch')
let co = require('co')
let R = require('ramda')
let promisify = require('es6-promisify')
let mkdirp = require('mkdirp')
let slug = require('slug')
let fs = require('fs')
let path = require('path')

let transform = require('../lib/transform')
let subjects = require('../lib/subjects')

let apiKey = 'VrJoAKmDGmvjTw9ZTGy2tcrZ'
let apiUrl = 'http://api.commonstandardsproject.com/api/v1/'

let root = 'subjects'

co(function* () {

  let js = yield jurisdictions()

  let c = R.find(R.propEq('title', 'California'))(js.data)

  let j = yield jurisdiction(c.id)
  let standards = j.data.standardSets


  for (var i = 0; i < standards.length; i++) {
    let standardSet = standards[i]
    let subject = slug(standardSet.subject.toLowerCase())
    if (!R.find(R.eq(subject))(subjects))
      continue

    let s = yield(standard(standardSet.id))
    s = s.data

    let dir = path.join(root, subject)
    mkdirp.sync(dir)
    let file = path.join(dir, slug(s.title.toLowerCase())) + '.json'

    s = transform(s)

    fs.writeFileSync(file, JSON.stringify(s, null, '\t'))
    console.log('wrote to:', file)
  }

}).catch(function(err) {
  console.error(err.stack)
})
function standard(id) {
  return fetch(url('/standard_sets/' + id + '/')).then(parseJSON)
}

function jurisdiction(id) {
  return fetch(url('/jurisdictions/' + id + '/')).then(parseJSON)
}

function jurisdictions() {
  return fetch(jurisdictionsUrl()).then(parseJSON)
}

function jurisdictionsUrl() {
  return url('jurisdictions/')
}

function parseJSON(res) {
  return res.json()
}

function url(endpoint) {
  return apiUrl + endpoint + '?api-key=' + apiKey
}
