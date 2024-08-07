# Customize the action description

1. Node attribute list

- `type` : indicates the field type. Optional values: `string, number, boolean, options, jsonObject, notice, inputData, multiInputData, fixedCollection, filterCondition`
- `name` : indicates the field name
- `displayName`: : indicates the field display name
- `description` : indicates the field description
- `required` : indicates whether it is required
- `default` : indicates the default value
- `options` : indicates the drop-down list of options. This parameter is valid when type is options

- `value`: Pulls the value of a form field
- `name` : pulls the name of the form field
- `description` : Pulls the form field description
- `action` : pulls a form field
- `displayOptions` : Display options

- `show`:

- `<name>: [<value>]`
- `in`: indicates the type of HTTP request parameters: PATH, HEADER, QUERY, and BODY

1. Node attribute type

- `string` : indicates the string input box

- `typeOption`:

- `{"editor": "codeNodeEditor"}`  Custom code input field
- `number` : indicates a number input box
- `options`: indicates the drop-down option, which must be used together with the options list properties

- `notice` : indicates the text type. The markdown syntax is supported
- `jsonObject` : JSON input box with JSON format verification
- `inputData` : indicates the data source
- `multiInputData` : indicates multiple data sources
- `fixedCollection` : indicates a dynamic input collection
- `filterCondition` : indicates the filtering condition
- `string`: