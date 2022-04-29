const fs = require('fs');
const path = require("path");
const csv = require('csv-parser');

const [, , inputFile, outputFile] = process.argv;

const inputFilePath = path.resolve(__dirname, `../files/input/${inputFile}`);
const outputFilePath = path.resolve(__dirname, `../files/output/${outputFile}`);

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

	fs.writeFileSync(outputFilePath, viewStr);
	console.log(`View fields written to ${outputFilePath}`);
}

fs.createReadStream(inputFilePath)
	.pipe(csv({
		mapHeaders: ({ header }) => fieldmap[header]
	}))
	.on('data', (data) => results.push(data))
	.on('end', printToView);

