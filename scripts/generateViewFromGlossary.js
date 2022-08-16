const fs = require('fs');
const path = require("path");
const csv = require('csv-parser');

const [, , inputFile, viewName] = process.argv;

const inputFilePath = path.resolve(__dirname, `../files/input/${inputFile}`);
const outputFilePath = path.resolve(__dirname, `../files/output/${viewName}.view.lkml`);

