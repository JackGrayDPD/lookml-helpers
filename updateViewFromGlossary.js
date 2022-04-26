/**
 * looker-generate-view-from-glossary
 * This script will take a .csv glossary template and write a Looker view file.
 * It will also generate a manifest file with constant names if the --constants flag is used.
 * Save your glossary contents in /files/input/looker_glossary.csv and run `node updateViewFromGlossary` from this project.
 * Results will write to /files/output/looker_view.lookml. File contents will be overwritten every time the script is run.
 */

const fs = require('fs');
const { readError } = require('./functions');

const inputFile = __dirname + '/files/input/looker_glossary.csv';
const outputFile = __dirname + '/files/output/looker_view.lookml';
const testFile = __dirname + '/files/output/test.txt';

const input = fs.readFileSync(inputFile, "utf8", readError).toString().split('\r\n');

const headers = input[0].split(',');
const data = input.filter((e, idx) => { return idx == 0 ? false : true })

const fieldmap = {
	'Field Name': 'fieldname',
	'Field Type': 'fieldtype',
	'Data Type': 'type',
	'SQL': 'sql',
	'Label': 'label',
	'Group Label': 'group_label',
	'Group Item Label': 'group_item_label',
	'Description': 'description'
}
//fieldmap[header]

//const obj = [];
/*
[
	{
		fieldname: 'account_number',
		fieldtype: 'dimension',
		type: 'string',
		sql: '${TABLE}.account_number',
		label: 'Account Number',
		group_label: 'Customer',
		group_item_label: 'Account Number',
		description: 'This is the account number to which the parcel belongs.'
	},
	{
		fieldname: 'account_number',
		fieldtype: 'dimension',
		type: 'string',
		sql: '${TABLE}.account_number',
		label: 'Account Number',
		group_label: 'Customer',
		group_item_label: 'Account Number',
		description: 'This is the account number to which the parcel belongs.'
	}
]
*/

data.forEach((line, lIdx) => {
	// 'account_number,dimension,string,${TABLE}.account_number,Account Number,Customer,Account Number,This is the account number to which the parcel belongs.',
	var lineArr = line.split(',');
	var obj = {
		fieldname: lineArr[0],
		fieldtype: lineArr[1],
		type: lineArr[2],
		sql: lineArr[3],
		label: lineArr[4],
		group_label: lineArr[5],
		group_item_label: lineArr[6],
		description: lineArr[7]
	};
})
		/*
{
		fieldname: 'account_number',
		fieldtype: 'dimension',
		type: 'string',
		sql: '${TABLE}.account_number',
		label: 'Account Number',
		group_label: 'Customer',
		group_item_label: 'Account Number',
		description: 'This is the account number to which the parcel belongs.'
	}
*/
