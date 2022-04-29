/**
 * looker-generate-view-from-glossary
 * This script will take a .csv glossary template and write a Looker view file.
 * It will also generate a manifest file with constant names if the --constants flag is used. **CURRENTLY DOESN'T DO THIS**
 * Save your glossary contents in /files/input/looker_glossary.csv and run `node updateViewFromGlossary` from this project.
 * Results will write to /files/output/looker_view.lookml. File contents will be overwritten every time the script is run.
 */

const fs = require('fs');
const path = require("path");
const csv = require('csv-parser');

const inputFile = path.resolve(__dirname, '../files/input/looker_glossary.csv');
const outputFile = path.resolve(__dirname, '../files/output/looker_view.lookml');

const fieldmap = {
	'Field Name': 'fieldname',
	'Field Type': 'fieldtype',
	'Data Type': 'type',
	'SQL': 'sql',
	'Label': 'label',
	'Group Label': 'group_label',
	'Group Item Label': 'group_item_label',
	'Description': 'description'
};
const results = [];
var viewStr = '';

const printToView = () => {
	results.forEach(field => {
		const { fieldtype, fieldname, type, sql, label, group_label, group_item_label, description } = field;
		const str = `
${fieldtype}: ${fieldname} {
	label: "${label}"
	group_label: "${group_label}"
	group_item_label: "${group_item_label}"
	description: "${description}"
	type: ${type}
	sql: ${sql} ;;
}
`;
		viewStr = viewStr + str;
	});

	fs.writeFileSync(outputFile, viewStr);
	console.log(`View fields written to ${outputFile}`);
}

fs.createReadStream(inputFile)
	.pipe(csv({
		mapHeaders: ({ header }) => fieldmap[header]
	}))
	.on('data', (data) => results.push(data))
	.on('end', printToView);

