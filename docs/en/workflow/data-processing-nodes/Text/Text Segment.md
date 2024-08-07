# Text Segment

Extract text from string values.

## Input parameters

- `text`: The string from which text is extracted.
- `separator`: The position of the first character to be extracted from a string value in a text field, where 0 is the first character, 1 is the second character, and so on. If no value is provided in the 'end before' field, the first set of characters that are equal in quantity to the input value in that field will be extracted.
- `end before`: The position one character larger than the last character to be extracted. If the value is greater than the length of the string in the text field, the entire string will be extracted. If no value is provided in the 'start at' field, the first set of characters that are equal in quantity to the input value in that field will be extracted.

## Output parameters

- `segment`: The extracted text segment.
