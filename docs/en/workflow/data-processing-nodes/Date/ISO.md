# ISO

Calculates the corresponding ISO8601 string for the given date and time using the UTC Z symbol (not adjusted for the local time zone).

This function is usually unnecessary. When you drag and drop a date and time object to any text input field, it is automatically converted to ISO UTC Z symbol format. If you want to get the current date and time, use the Now application node. If you want to display the date and time for a specific time zone, use Date to Text Input

## Enter parameters

- `start` : converts the date and time to ISO format.

## Output parameters

- `output` : Converts the date and time in ISO format. For example: 2016-09-07T16:55:25.670Z.