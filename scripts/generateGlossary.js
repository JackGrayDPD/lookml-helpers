const fs = require('fs');
const path = require("path");
const lookmlParser = require('lookml-parser');
const { readError } = require('../functions');

const [, , inputFile, outputFile] = process.argv;

const inputFilePath = path.resolve(__dirname, `../files/input/${inputFile}`);
const outputFilePath = path.resolve(__dirname, `../files/output/${outputFile}`);


const { view } = lookmlParser.parse(fs.readFileSync(inputFilePath, "utf8", readError));

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
	var fieldName = dimensions[key]['$name'];
	var fieldType = dimensions[key]['$type'];
	var type = dimensions[key].type || '';
	var sql = dimensions[key].sql || '';
	var desc = dimensions[key].description || '';
	var label = dimensions[key].label || '';
	var group_label = dimensions[key].group_label || '';
	var group_item_label = dimensions[key].group_item_label || '';

	csvLines = csvLines + [clean(fieldName), clean(fieldType), clean(type), clean(sql), clean(label), clean(group_label), clean(group_item_label), clean(desc)].join(',').concat('\n');
});

measureKeys.forEach(key => {
	var fieldName = measures[key]['$name'];
	var fieldType = measures[key]['$type'];
	var type = measures[key].type || '';
	var sql = measures[key].sql || '';
	var desc = measures[key].description || '';
	var label = measures[key].label || '';
	var group_label = measures[key].group_label || '';
	var group_item_label = measures[key].group_item_label || '';

	csvLines = csvLines + [clean(fieldName), clean(fieldType), clean(type), clean(sql), clean(label), clean(group_label), clean(group_item_label), clean(desc)].join(',').concat('\n');
});

fs.writeFileSync(outputFilePath, csvLines);
console.log(`Glossary written to ${outputFilePath}`);