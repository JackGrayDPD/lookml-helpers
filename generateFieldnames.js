/**
 * looker-generate-fieldnames
 * This script will take a Looker view file and produce a comma-separated list of all fieldnames for that view in looker_views.lookml.
 * Save your view contents in files/input/looker_view.lookml and run `node generateFieldnames` from this project.
 * Results will write to files/output/looker_fields.lookml. File contents will be overwritten every time the script is run
 */

const fs = require('fs');
const { readError, alphabeticalSort } = require('./functions');

const inputFile = __dirname + '/files/input/looker_view.lookml';
const outputFile = __dirname + '/files/output/looker_glossary.csv';
const testFile = __dirname + '/files/output/test.txt';

const input = fs.readFileSync(inputFile, "utf8", readError).toString().split("\n");
var fieldNames = [];
var viewName;
input.forEach(line => {
	if (line.trim().startsWith("dimension:") || line.trim().startsWith("measure:") || line.trim().startsWith("parameter:")) {
		var fieldName = line.trim().split(":")[1].split("{")[0].trim();
		fieldNames.push(`${viewName}.${fieldName}`);
	} else if (line.trim().startsWith("view:")) {
		viewName = line.trim().split(":")[1].split("{")[0].trim();
	}
});

fieldNames = fieldNames.sort(alphabeticalSort)
const fieldList = fieldNames.join(", ");

fs.writeFileSync(outputFile, fieldList);
console.log(`Fieldnames written to ${outputFile}`);