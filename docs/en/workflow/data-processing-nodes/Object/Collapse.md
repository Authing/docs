# Collapse

The <strong>Collapse</strong> is used to combine a list of objects with key and value properties into a single JSON object. This is the opposite of what the <strong>Split</strong> function does.

## Enter the field

- `list`  (Object list): List of objects to be combined

Click the empty input field to add a second or subsequent list of JSON objects that you also want to combine into a single JSON object.

## Output field

- `output` : JSON object containing key/value pairs

## Example

Here are the two objects to be combined:

```css
{
"key":  "foo",
"value": "bar"
}
{
"key":  "baz",
"value": "taz"
}
` ` `

After executing 'Collapse', the output will be:

```json
{"foo":"bar","baz":"taz"}
` ` `

This combines the properties from the two objects into one object by name and creates a list of key-value pairs.