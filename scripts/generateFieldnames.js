const fs = require("fs");
const path = require("path");
const lookmlParser = require("lookml-parser");
const { readError, alphabeticalSort } = require("../functions");

const [, , inputDir, viewName] = process.argv;

const inputFilesPath = path.resolve(__dirname, `../files/input/${inputDir}`);
const inputFiles = fs.readdirSync(inputFilesPath);
const outputFilePath = path.resolve(
  __dirname,
  `../files/output/fieldNames-${viewName}.txt`
);

let fieldnames = [];
for (const filename of inputFiles) {
  const filepath = path.resolve(
    __dirname,
    `../files/input/${inputDir}/${filename}`
  );
  const { view: rawView } = lookmlParser.parse(
    fs.readFileSync(filepath, "utf8", readError)
  );

  const lkmlViewName = Object.keys(rawView)[0];
  const view = Array.isArray(rawView[lkmlViewName])
    ? rawView[lkmlViewName][0]
    : rawView[lkmlViewName];

  let dimensions = view.dimension || {};
  dimensions = filterHidden(dimensions);
  let measures = view.measure || {};
  measures = filterHidden(measures);
  let params = view.parameter || {};
  params = filterHidden(params);

  fieldnames = [
    ...fieldnames,
    ...Object.keys(dimensions).map(getFieldnames),
    ...Object.keys(measures).map(getFieldnames),
    ...Object.keys(params).map(getFieldnames),
  ];
}

fieldnames = [...new Set([...fieldnames])].sort(alphabeticalSort).join(", ");
fs.writeFileSync(outputFilePath, fieldnames);
console.log(`Fieldnames written to ${outputFilePath}`);

function filterHidden(obj) {
  const fields = Object.keys(obj); // array of all fieldnames
  for (const f of fields) {
    if (obj[f].hidden && obj[f].hidden == true) {
      delete obj[f];
    }
  }
  return obj;
}

function getFieldnames(f) {
  return `${viewName}.${f}`;
}
