/**
 * looker-create-field-tests
 * This script will take a Looker view file and write a test file to test all fields are in the view.
 * Save your view contents in files/input/looker_view.lookml and run `node generateTests` from this project.
 * Results will write to files/output/looker_tests.lookml. File contents will be overwritten every time the script is run
 */

const fs = require('fs');
const { readError, alphabeticalSort } = require('./functions');

const inputFile = __dirname + '/files/input/looker_view.lookml';
const outputFile = __dirname + '/files/output/looker_tests.lookml';
const testFile = __dirname + '/files/output/test.txt';

const input = fs.readFileSync(inputFile, "utf8", readError).toString().split("\n");
var fieldNames = [];
var viewName;
input.forEach(line => {
	if (line.trim().startsWith("dimension:") || line.trim().startsWith("measure:")) {
		var fieldName = line.trim().split(":")[1].split("{")[0].trim();
		fieldNames.push(fieldName);
	} else if (line.trim().startsWith("view:")) {
		viewName = line.trim().split(":")[1].split("{")[0].trim();
	}
});

fieldNames = fieldNames.sort(alphabeticalSort)

var tests = [];
fieldNames.forEach(f => {
	tests.push(`\t\tcolumn: ${f} { field: ${viewName}.${f} }`)
});

const firstLine = `test: ${viewName}_explore_fields {\n\texplore_source: ${viewName} {\n`
const lastLine = `\n# ADD FILTERS AND LIMITS HERE\n\t\tlimit: 1\n\t}\n# ASSERTIONS HERE\n\t# assert: explore_fields_check {\n\t\t# expression: 1=1 ;;\n\t# }\n}`
const body = tests.join(`\n`);
const fullTest = firstLine + body + lastLine;

fs.writeFileSync(outputFile, fullTest);
console.log(`Tests written to ${outputFile}`);