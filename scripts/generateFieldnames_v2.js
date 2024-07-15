const fs = require("fs");
const path = require("path");
const lookmlParser = require("lookml-parser");
const { readError, alphabeticalSort } = require("../functions");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 -- [options]")
  .options({
    d: {
      alias: ["dir", "directory", "inputDir"],
      describe: "The input directory under /files/input",
      type: "string",
      demandOption: true,
    },
  })
  .help()
  .parse();
const { inputDir } = argv;
const viewName = inputDir;

const inputFilesPath = path.resolve(__dirname, `../files/input/${inputDir}`);
const inputFiles = fs.readdirSync(inputFilesPath);
const outputFilePath = path.resolve(
  __dirname,
  `../files/output/fieldNames-${viewName}.csv`
);

let fieldList = [];
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
  let measures = view.measure || {};

  let fields = {};
  Object.assign(fields, dimensions, measures);

  fields = filterFields(fields);

  const fieldData = Object.entries(fields).map(([key, value]) => {
    return [key, `"${cleanStr(value.sql)}"`].join(",");
  });

  fieldList = [...fieldList, ...fieldData];
}

fieldList = [...new Set([...fieldList])].sort(alphabeticalSort).join("\n");
fs.writeFileSync(outputFilePath, fieldList);
console.log(`Fieldnames written to ${outputFilePath}`);

function filterFields(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (value.hidden || !value.sql || value.sql == "") {
      delete fields[key];
    }
  }
  return fields;
}

function cleanStr(str) {
  if (str) {
    return str
      .trim()
      .replaceAll('"', "'")
      .replaceAll("\r", "")
      .replaceAll("\t", " ");
  } else {
    return "";
  }
}
