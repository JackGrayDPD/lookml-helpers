const fs = require('fs');
const path = require("path");
const lookmlParser = require('lookml-parser');
const { readError, alphabeticalSort } = require('../functions');

const [, , inputFile, outputFile] = process.argv;

const inputFilePath = path.resolve(__dirname, `../files/input/${inputFile}`);
const outputFilePath = path.resolve(__dirname, `../files/output/${outputFile}`);

const { view } = lookmlParser.parse(fs.readFileSync(inputFilePath, "utf8", readError));

const viewName = Object.keys(view)[0];

const dimensions = view[viewName].dimension;
const dimensionKeys = Object.keys(dimensions);
const measures = view[viewName].measure;
const measureKeys = Object.keys(measures);

const fieldnames = [...dimensionKeys, ...measureKeys].sort(alphabeticalSort).join(", ");
fs.writeFileSync(outputFilePath, fieldnames);
console.log(`Fieldnames written to ${outputFilePath}`);