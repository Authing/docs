# List to Text

This function generates a single text output from a list using an optional separator. For example, if you have a list of product names, you can use this function to create a comma-separated list of products to include in an email.

This function works with lists of text, numbers, True/False, or Date & Time types. To create text from a list of objects, first use the Pluck function to get a list of values from a single key of the object, and then pass that list to the Join.

## Enter parameters

- `list` : indicates the list to be operated on. This can be a list of text, numbers, true/false, or dates and times.
- `separator` <strong> : </strong> The character that is inserted between each item in the output text. It can be a single character, such as a comma, or multiple characters, such as a comma followed by a space.

## Output parameters

- `text` : Output text.