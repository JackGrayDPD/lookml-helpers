/**
 * looker-create-field-tests
 * This script will take a Looker view file and write a test file to test all fields are accessible in a query.
 * Save your view contents in looker_view.lkml and run `node .` from this project.
 * Results will write to looker_tests.lkml. File contents will be overwritten every time the script is run
 */

const fs = require('fs');

const inputFile = __dirname + '/looker_view.lookml';
const outputTestsFile = __dirname + '/looker_tests.lookml';
const outputFieldsFile = __dirname + '/looker_fields.lookml';

function readError(err, data) {
	if (err) {
		console.log(err);
	} else {
		return data
	}
}

function alphabeticalSort(a, b) {
	if (a < b) return -1;
	if (a > b) return 1;
}

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
const lastLine = `\n# ADD FILTERS AND LIMITS HERE\n\t}\n# ASSERTIONS HERE\n\t# assert: explore_fields_check {\n\t\t# expression: 1=1 ;;\n\t# }\n}`
const body = tests.join(`\n`);
const fullTest = firstLine + body + lastLine;

const fieldList = fieldNames.join(",");

fs.writeFileSync(outputTestsFile, fullTest);
fs.writeFileSync(outputFieldsFile, fieldList);
console.log("Tests written!");