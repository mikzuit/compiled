#!/usr/bin/env node

'use strict'

var debug = require('debug')('compiled')

var help = [
  'USE: build <path/to/first/js/file>',
  '     build src/main.js'
].join('\n')

require('simple-bin-help')({
  minArguments: 3,
  packagePath: __dirname + '/../package.json',
  help: help
})

var inputFilename = process.argv[2]
var outputFilename = 'dist/bundle.js'
var featuresFilename = 'dist/es6-features.json'
debug('building from', inputFilename)

var saveFile = require('fs').writeFileSync

function roll (inputFilename, outputFilename) {
  var rollup = require('rollup')

  return rollup.rollup({
    entry: inputFilename
  }).then(function (bundle) {
    return bundle.write({
      format: 'cjs',
      dest: outputFilename
    }).then(function () {
      debug('saved bundle', outputFilename)
      return outputFilename
    })
  })
}

function findUsedES6 (outputFilename, filename) {
  var testify = require('es-feature-tests/testify')
  debug('scanning for es features', filename)
  var output = testify.scan({
    files: filename,
    output: 'json',
    enable: []
  })
  debug('used ES features', output)

  saveFile(outputFilename, JSON.stringify(output, null, 2), 'utf-8')
  debug('saved file with found es features', outputFilename)
}

roll(inputFilename, outputFilename)
  .then(findUsedES6.bind(null, featuresFilename))
  .catch(function (err) {
    console.error('problem building', inputFilename)
    console.error(err.message)
    process.exit(-1)
  })
