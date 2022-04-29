# lookml-helpers
Run `npm install` to use this project.

## looker-generate-tests
Save a view's file contents into `/files/input/looker_view.lookml`, then run `node generateTests`. This will create or overwrite the file `/files/output/looker_tests.lookml` with a basic field checking test.

## looker-generate-fieldnames
Save a view's file contents into `/files/input/looker_view.lookml`, then run `node generateFieldnames`. This will create or overwrite the file `/files/looker_fields.lookml` with a comma-seperated list of all fields in the view.

## looker-generate-glossary
Save a view's file contents into `/files/input/looker_view.lookml`, then run `node generateGlossary`. This will create or overwrite the file `/files/looker_glossary.csv` with a comma-seperated list of all fields in the view, with other attributes like label and group label.

## looker-get-constant-names
Save your manifest contents in `/files/input/looker_manifest.lookml` and run `node getConstantNames`. This will create or overwrite the file `/files/looker_constants.csv` with a comma-seperated list of all constants and their values.

## looker-generate-view-from-glossary
Save your glossary contents in `/files/input/looker_glossary.csv` and run `node updateViewFromGlossary`. This will create or overwrite the file `/files/output/looker_view.lookml`. If you use the `--constants` flag, it will also generate or overwrite `/files/input/looker_manifest.lookml` with constants for group labels.
