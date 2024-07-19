# Text to Date

Creates a date and time from text content in the specified format.

For most standard formats, this function is not necessary. You can pass any standard date and time text to date input and have it automatically converted. This function is used in non-standard or ambiguous formats, for example the value 2/1 May be read as 1-Feb or 2-Jan.

## Enter parameters

- `start` : Text to be converted to date and time values.
- `format` : indicates the date format code of the input value in the start field.

## Output parameters

- `output` : date object, which corresponds to the start input value according to the specified format code.