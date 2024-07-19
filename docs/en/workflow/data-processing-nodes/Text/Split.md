# Split

Split the text into a list of text segments separated by commas or other specified delimiters.

If there are comma separated spaces between words (such as This, is, an), make sure to include a space as a separator after the comma so that the result set output field does not return a space at the beginning of the word

##Input parameters

- `text`: The target string value that will be converted to a list. For example: 1, 2, 3
- `separator`: a delimiter used to determine the position of the text's segmentation. This value can be any of the following:

- Individual characters, such as commas
- A character sequence, such as a comma followed by a space
- Line break

## Output parameters

- `result list`: a list of string value conversions.
