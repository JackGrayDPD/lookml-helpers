const fs = require('fs');
const path = require("path");
const lookmlParser = require('lookml-parser');
const { readError, alphabeticalSort } = require('../functions');

const [, , inputFile, viewName] = process.argv;

const inputFilePath = path.resolve(__dirname, `../files/input/${inputFile}`);
const outputFilePath = path.resolve(__dirname, `../files/output/${viewName}.txt`);

const { view } = lookmlParser.parse(fs.readFileSync(inputFilePath, "utf8", readError));

const lkmlViewName = Object.keys(view)[0];
const dimensions = view[lkmlViewName].dimension || {};
const dimensionKeys = Object.keys(dimensions).map(f => {return `${viewName}.${f}`});
const measures = view[lkmlViewName].measure || {};
const measureKeys = Object.keys(measures).map(f => {return `${viewName}.${f}`});

const fieldnames = [...new Set([...dimensionKeys, ...measureKeys])].sort(alphabeticalSort);

var tests = [];
fieldnames.forEach(f => {
	tests.push(`\t\tcolumn: ${f} { field: ${viewName}.${f} }`)
});

const firstLine = `test: ${viewName}_explore_fields {\n\texplore_source: ${viewName} {\n`
const lastLine = `\n# ADD FILTERS AND LIMITS HERE\n\t\tlimit: 1\n\t}\n# ASSERTIONS HERE\n\tassert: explore_fields_check {\n\t\texpression: 1=1 ;;\n\t}\n}`
const body = tests.join(`\n`);
const fullTest = firstLine + body + lastLine;

fs.writeFileSync(outputFilePath, fullTest);
console.log(`Tests written to ${outputFilePath}`);