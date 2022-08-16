const fs = require('fs');
const path = require("path");
const lookmlParser = require('lookml-parser');
const { readError, alphabeticalSort } = require('../functions');

//const [, , inputFile, outputFile, viewName] = process.argv;
const [, , inputFile, viewName] = process.argv;

const inputFilePath = path.resolve(__dirname, `../files/input/${inputFile}`);
//const outputFilePath = path.resolve(__dirname, `../files/output/${outputFile}`);
const outputFilePath = path.resolve(__dirname, `../files/output/fieldNames-${viewName}.txt`);

const { view } = lookmlParser.parse(fs.readFileSync(inputFilePath, "utf8", readError));

const lkmlViewName = Object.keys(view)[0];
const dimensions = view[lkmlViewName].dimension || {};
const dimensionKeys = Object.keys(dimensions).map(f => {return `${viewName}.${f}`});
const measures = view[lkmlViewName].measure || {};
const measureKeys = Object.keys(measures).map(f => {return `${viewName}.${f}`});
const params = view[lkmlViewName].parameter || {};
const paramKeys = Object.keys(params).map(f => {return `${viewName}.${f}`});

const fieldnames = [...new Set([...dimensionKeys, ...measureKeys, ...paramKeys])].sort(alphabeticalSort).join(", ");
fs.writeFileSync(outputFilePath, fieldnames);
console.log(`Fieldnames written to ${outputFilePath}`);