/**
 * looker-get-constant-names
 * This script will take a Looker manifest file and write a .csv lookup table of each constant and its value.
 * Save your manifest contents in files/input/looker_manifest.lookml and run `node getConstantNames` from this project.
 * Results will write to looker_constants.csv. File contents will be overwritten every time the script is run.
 */

const fs = require('fs');
const path = require("path");
const lookmlParser = require('lookml-parser');
const { readError } = require('../functions');

const inputFile = path.resolve(__dirname, '../files/input/looker_manifest.lookml');
const outputFile = path.resolve(__dirname, '../files/output/looker_constants.csv');

const { constant } = lookmlParser.parse(fs.readFileSync(inputFile, "utf8", readError));

const constantKeys = Object.keys(constant);

var csvLines = 'Constant Name,Constant Value';
constantKeys.forEach(key => {
	csvLines = csvLines + '\n' + ['@{' + key + '}', constant[key].value].join(',')
});

fs.writeFileSync(outputFile, csvLines);
console.log(`Constants written to ${outputFile}`);
