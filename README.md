# lookml-helpers

## looker-generate-tests
Copy/paste a view's file contents into looker_view.lookml, then run ```node generateTests```. This will create or overwrite the file looker_tests.lookml with a basic field checking test.

## looker-generate-fieldnames
Copy/paste a view's file contents into looker_view.lookml, then run ```node generateFieldnames```. This will create or overwrite the file looker_fields.lookml with a comma-seperated list of all fields in the view.