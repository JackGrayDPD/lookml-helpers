/**
 * looker-generate-fieldnames
 * This script will take a Looker view file and produce a comma-separated list of all fieldnames for that view in looker_views.lookml.
 * Save your view contents in files/input/looker_view.lookml and run `node generateFieldnames` from this project.
 * Results will write to files/output/looker_fields.lookml. File contents will be overwritten every time the script is run
 */

const fs = require('fs');
const lookmlParser = require('lookml-parser');
const { readError, alphabeticalSort } = require('./functions');

const inputFile = __dirname + '/files/input/looker_view.lookml';
const outputFile = __dirname + '/files/output/looker_fieldnames.txt';

const { view } = lookmlParser.parse(fs.readFileSync(inputFile, "utf8", readError));

const viewName = Object.keys(view)[0];

const dimensions = view[viewName].dimension;
const dimensionKeys = Object.keys(dimensions);
const measures = view[viewName].measure;
const measureKeys = Object.keys(measures);

const fieldnames = [...dimensionKeys, ...measureKeys].sort(alphabeticalSort).join(", ");
fs.writeFileSync(outputFile, fieldnames);
console.log(`Fieldnames written to ${outputFile}`);