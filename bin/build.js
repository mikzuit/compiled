#!/usr/bin/env node

'use strict'

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
console.log('building from', inputFilename)

var rollup = require('rollup')
rollup.rollup({
  entry: inputFilename
}).then(function (bundle) {
  bundle.write({
    format: 'cjs',
    dest: outputFilename
  })

  console.log('saved bundle', outputFilename)
}).catch(function (err) {
  console.error('problem building', inputFilename)
  console.error(err.message)
  process.exit(-1)
})
