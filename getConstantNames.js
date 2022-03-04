/**
 * looker-get-constant-names
 * This script will take a Looker manifest file and write a .csv lookup table of each constant and its value.
 * Save your manifest contents in files/input/looker_manifest.lookml and run `node getConstantNames` from this project.
 * Results will write to looker_constants.csv. File contents will be overwritten every time the script is run.
 */

const fs = require('fs');
const { readError } = require('./functions');

const inputFile = __dirname + '/files/input/looker_manifest.lookml';
const outputFile = __dirname + '/files/output/looker_constants.csv';
const testFile = __dirname + '/files/output/test.txt';

const input = fs.readFileSync(inputFile, "utf8", readError).toString().split(/((constant): ([A-Za-z_0-9]+) {\s([\s]+[A-Za-z0-9_]*:\s*[A-Za-z0-9_;.${} "@?=&]+)+)/g);

var constants = [];
input.forEach(line => {
	if (line.trim().startsWith("constant:")) {
		constants.push(line.split('\n'));
	}
});
constants.forEach((constant, idx) => {
	constant.forEach((c, i) => {
		constants[idx][i] = c.trim()
	});
})

constants.forEach((constant, idx) => {
	const constantName = '@{' + constant[0].split(':')[1].trim().split(' ')[0] + '}';
	const value = constant[1].split(':')[1].trim().replaceAll("\"", "");
	constants[idx] = { constantName, value }
})

var csvLines = 'Constant Name,Constant Value';
constants.forEach(c => {
	csvLines = csvLines + '\n' + [c.constantName, c.value].join(',')
})
fs.writeFileSync(outputFile, csvLines);
console.log(`Constants written to ${outputFile}`);
