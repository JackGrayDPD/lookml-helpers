/**
 * looker-generate-fieldnames
 * This script will take a Looker view file and produce a comma-separated list of all fieldnames for that view in looker_views.lookml.
 * Save your view contents in looker_view.lkml and run `node generateFieldnames` from this project.
 * Results will write to looker_fields.lkml. File contents will be overwritten every time the script is run
 */

const fs = require('fs');

const inputFile = __dirname + '/looker_view.lookml';
const outputFile = __dirname + '/looker_fields.lookml';

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
	if (line.trim().startsWith("dimension:") || line.trim().startsWith("measure:") || line.trim().startsWith("parameter:")) {
		var fieldName = line.trim().split(":")[1].split("{")[0].trim();
		fieldNames.push(fieldName);
	} else if (line.trim().startsWith("view:")) {
		viewName = line.trim().split(":")[1].split("{")[0].trim();
	}
});

fieldNames = fieldNames.sort(alphabeticalSort)
var fields = [];
fieldNames.forEach(f => {
	fields.push(`${viewName}.${f}`)
});
const fieldList = fields.join(", ");

fs.writeFileSync(outputFile, fieldList);
console.log(`Fieldnames written to ${outputFile}`);