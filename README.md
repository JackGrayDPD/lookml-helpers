# lookml-helpers
Run `npm install` to use this project.

# Scripts
## generateTests
This script will take a Looker view file and produce a Looker test file in `/files/output/OUTPUT_FILE.txt`.
 * Save your view contents in `files/input/INPUT_FILE` 
 * Run `npm run generateTests INPUT_FILE OUTPUT_FILE` from the project root.
	* e.g. `npm run generateTests table.view.lkml view.test.lkml`
 * Results will write to `/files/output/OUTPUT_FILE`. File contents will be overwritten every time the script is run.
 * INPUT_FILE must be a .txt, .lookml, .lkml
 * OUTPUT_FILE must be a .txt, .lookml, .lkml

## generateFieldnames
This script will take a Looker view file and produce a comma-separated list of all fieldnames for that view in `/files/output/OUTPUT_FILE.txt`.
 * Save your view contents in `files/input/INPUT_FILE` 
 * Run `npm run generateFieldnames INPUT_FILE OUTPUT_FILE` from the project root.
	* e.g. `npm run generateFieldNames table.view.lkml table_fieldnames.txt`
 * Results will write to `/files/output/OUTPUT_FILE`. File contents will be overwritten every time the script is run.
 * INPUT_FILE must be a .txt, .lookml, .lkml
 * OUTPUT_FILE must be a .csv

## generateGlossary
This script will take a Looker view file and produce a .csv glossary template.
 * Save your view contents in `files/input/INPUT_FILE`
 * Run `npm generateGlossary INPUT_FILE OUTPUT_FILE` from the project root.
	* e.g. `npm run generateGlossary table.view.lkml viewname_glossary.csv`
 * Results will write to `/files/output/OUTPUT_FILE`. File contents will be overwritten every time the script is run.


## generateConstantNames
This script takes a Looker manifest file and outputs a CSV lookup table of each constant and its value.
 * Save your manifest contents in `files/input/INPUT_FILE`
 * Run `npm run getConstantNames INPUT_FILE OUTPUT_FILE` from the project root.
	* e.g. `npm run getConstantNames viewname.manifest.lkml viewname_constants.txt`
 * Results will write to `/files/output/OUTPUT_FILE`. File contents will be overwritten every time the script is run.

## generateViewFromGlossary
This script will take a .csv glossary and write a Looker view file.
 * Save your glossary contents in `files/input/INPUT_FILE`
 * Run `npm run generateViewFromGlossary INPUT_FILE OUTPUT_FILE` from the project root.
	* e.g. `npm run generateViewFromGlossary view_glossary.csv view.lkml`
 * Results will write to `/files/output/OUTPUT_FILE`. File contents will be overwritten every time the script is run.
 * INPUT_FILE must be a .csv
 * OUTPUT_FILE must be a .txt, .lookml, .lkml