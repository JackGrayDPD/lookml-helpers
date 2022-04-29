const fs = require('fs');
const path = require("path");
const lookmlParser = require('lookml-parser');
const { readError } = require('../functions');

const [, , inputFile, outputFile] = process.argv;

const inputFilePath = path.resolve(__dirname, `../files/input/${inputFile}`);
const outputFilePath = path.resolve(__dirname, `../files/output/${outputFile}`);

const { constant } = lookmlParser.parse(fs.readFileSync(inputFilePath, "utf8", readError));

const constantKeys = Object.keys(constant);

var csvLines = 'Constant Name,Constant Value';
constantKeys.forEach(key => {
	csvLines = csvLines + '\n' + ['@{' + key + '}', constant[key].value].join(',')
});

fs.writeFileSync(outputFilePath, csvLines);
console.log(`Constants written to ${outputFilePath}`);
