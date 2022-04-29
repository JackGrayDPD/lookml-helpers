/**
 * looker-create-field-tests
 * This script will take a Looker view file and write a test file to test all fields are in the view.
 * Save your view contents in files/input/looker_view.lookml and run `node generateTests` from this project.
 * Results will write to files/output/looker_tests.lookml. File contents will be overwritten every time the script is run
 */

const fs = require('fs');
const path = require("path");
const lookmlParser = require('lookml-parser');
const { readError, alphabeticalSort } = require('../functions');

const inputFile = path.resolve(__dirname, '../files/input/looker_view.lookml');
const outputFile = path.resolve(__dirname, '../files/output/looker_tests.lookml');

const { view } = lookmlParser.parse(fs.readFileSync(inputFile, "utf8", readError));
const viewName = Object.keys(view)[0];

const dimensions = view[viewName].dimension;
const dimensionKeys = Object.keys(dimensions);
const measures = view[viewName].measure;
const measureKeys = Object.keys(measures);

const fieldnames = [...dimensionKeys, ...measureKeys].sort(alphabeticalSort);

var tests = [];
fieldnames.forEach(f => {
	tests.push(`\t\tcolumn: ${f} { field: ${viewName}.${f} }`)
});

const firstLine = `test: ${viewName}_explore_fields {\n\texplore_source: ${viewName} {\n`
const lastLine = `\n# ADD FILTERS AND LIMITS HERE\n\t\tlimit: 1\n\t}\n# ASSERTIONS HERE\n\tassert: explore_fields_check {\n\t\texpression: 1=1 ;;\n\t}\n}`
const body = tests.join(`\n`);
const fullTest = firstLine + body + lastLine;

fs.writeFileSync(outputFile, fullTest);
console.log(`Tests written to ${outputFile}`);