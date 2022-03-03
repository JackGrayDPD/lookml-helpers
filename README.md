# lookml-helpers

## looker-generate-tests
Copy/paste a view's file contents into files/input/looker_view.lookml, then run ```node generateTests```. This will create or overwrite the file files/output/looker_tests.lookml with a basic field checking test.

## looker-generate-fieldnames
Copy/paste a view's file contents into files/input/looker_view.lookml, then run ```node generateFieldnames```. This will create or overwrite the file files/looker_fields.lookml with a comma-seperated list of all fields in the view.

## looker-generate-glossary
Copy/paste a view's file contents into files/input/looker_view.lookml, then run ```node generateGlossary```. This will create or overwrite the file files/looker_glossary.csv with a comma-seperated list of all fields in the view.