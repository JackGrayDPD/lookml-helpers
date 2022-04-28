/**
 * looker-generate-glossary
 * This script will take a Looker view file and write a .csv glossary template.
 * Save your view contents in files/input/looker_view.lookml and run `node generateGlossary` from this project.
 * Results will write to looker_glossary.csv. File contents will be overwritten every time the script is run.
 */

const fs = require('fs');
const lookmlParser = require('lookml-parser')
const { readError } = require('./functions');

const inputFile = __dirname + '/files/input/looker_view.lookml';
const outputFile = __dirname + '/files/output/looker_glossary.csv';
const testFile = __dirname + '/files/output/test.txt';

// const { view } = lookmlParser.parse(fs.readFileSync(inputFile, "utf8", readError).replace(/(\r\n|\n|\r)/gm, " ").trim());
const { view } = lookmlParser.parse(fs.readFileSync(inputFile, "utf8", readError));

const viewName = Object.keys(view)[0];

const dimensions = view[viewName].dimension;
const dimensionKeys = Object.keys(dimensions);
const measures = view[viewName].measure;
const measureKeys = Object.keys(measures);

var csvLines = 'Field Name,Field Type,Data Type,SQL,Label,Group Label,Group Item Label,Description\n';

const clean = function (str) {
	return '"' + str.replace(/( )+/gm, " ").trim().replace(/"/g, '""') + '"';
}
dimensionKeys.forEach(key => {
	var fieldName = clean(dimensions[key]['$name']);
	var fieldType = clean(dimensions[key]['$type']);
	var type = clean(dimensions[key].type) || '';
	var sql = clean(dimensions[key].sql) || '';
	var desc = clean(dimensions[key].description) || '';
	var label = clean(dimensions[key].label) || '';
	var group_label = clean(dimensions[key].group_label) || '';
	var group_item_label = clean(dimensions[key].group_item_label) || '';

	csvLines = csvLines + [fieldName, fieldType, type, sql, label, group_label, group_item_label, desc].join(',').concat('\n');
});

measureKeys.forEach(key => {
	var fieldName = clean(measures[key]['$name']);
	var fieldType = clean(measures[key]['$type']);
	var type = clean(measures[key].type) || '';
	var sql = clean(measures[key].sql) || '';
	var desc = clean(measures[key].description) || '';
	var label = clean(measures[key].label) || '';
	var group_label = clean(measures[key].group_label) || '';
	var group_item_label = clean(measures[key].group_item_label) || '';

	csvLines = csvLines + [fieldName, fieldType, type, sql, label, group_label, group_item_label, desc].join(',').concat('\n');
});

fs.writeFileSync(outputFile, csvLines);
console.log(`Glossary written to ${outputFile}`);