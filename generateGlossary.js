/**
 * looker-generate-glossary
 * This script will take a Looker view file and write a .csv glossary template.
 * Save your view contents in files/input/looker_view.lookml and run `node generateGlossary` from this project.
 * Results will write to looker_glossary.csv. File contents will be overwritten every time the script is run.
 */

const fs = require('fs');
const { readError } = require('./functions');

const inputFile = __dirname + '/files/input/looker_view.lookml';
const outputFile = __dirname + '/files/output/looker_glossary.csv';
const testFile = __dirname + '/files/output/test.txt';

const input = fs.readFileSync(inputFile, "utf8", readError).toString().split(
	/((dimension|measure): ([A-Za-z_0-9]+) {\s([\s]+[A-Za-z0-9_]*:\s*[A-Za-z0-9_;.${} "@?=]+)+)/g
);

var fields = [];
input.forEach(el => {
	if (el.startsWith("dimension:") || el.startsWith("measure:")) {
		fields.push(el.split('\n'));
	}
})
fields.forEach((field, idx) => {
	field.forEach((f, i) => {
		fields[idx][i] = f.trim();
	})
})
// Each field is now an array in fields[] with one element per line

fields.forEach((field, idx) => {
	field.forEach((f, i) => { // inside each field[i] = f
		if (f.startsWith('dimension:') || f.startsWith('measure:')) {
			var parts = f.split(':'); // parts = ['dimension','fieldname {']
			if (parts[1].endsWith('{')) {
				parts[1] = parts[1].slice(0, -1);
			}
			fields[idx][i] = { fieldType: parts[0], fieldName: parts[1].trim() }
		} else {
			var parts = f.split(':'); // parts = [key,value]
			fields[idx][i] = { key: parts[0], value: parts[1].replace(';;', '').trim() }
		}
	})
})

var fields2 = []
fields.forEach((field, idx) => {
	var newFieldObj = {};
	field.forEach((f, i) => {
		if (i === 0) {
			newFieldObj.fieldType = f.fieldType
			newFieldObj.fieldName = f.fieldName
		} else {
			newFieldObj.params = { ...newFieldObj.params, [f.key]: f.value }
		}
	})
	fields2.push(newFieldObj);
})

var csvLines = 'Field Name,Field Type,Data Type,SQL,Label,Group Label,Group Item Label,Description\n';
fields2.forEach(field => {
	var fieldName = field.fieldName;
	var fieldType = field.fieldType;
	var type = field.params.type || '';
	var sql = field.params.sql || '';
	var desc = field.params.description || '';
	var label = field.params.label || '';
	var group_label = field.params.group_label || '';;
	var group_item_label = field.params.group_item_label || '';;
	csvLines = csvLines + [fieldName, fieldType, type, sql, label, group_label, group_item_label, desc].join(',').concat('\n');
})
fs.writeFileSync(outputFile, csvLines);
console.log(`Glossary written to ${outputFile}`);
