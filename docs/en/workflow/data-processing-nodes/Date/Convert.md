# Convert

Convert dates and times to various formats

## Enter parameters

- `start` : Date and time text in ISO format or date and time objects in many common date and time text formats will be automatically converted.
- `format` : Date format, indicating how to display the date or time, such as M/D/Y to produce 9/7/2016 or hh:mm a, such as 09:05am. For formatting codes, see Date to text.
- `zone` : TZ time zone, such as USA/Pacific or Europe/Paris.

## Output parameters

- `date` : date and time object corresponding to the start value.
- `iso` : Converts date and time in ISO format, but without fractional seconds. For example :2016-09-07T16:55:25.670Z.
- `epoch` : indicates the date and time in epoch format. Seconds are counted from midnight UTC/GMT on January 1, 1970, excluding leap seconds.
- `unix` : The date and time in milliseconds calculated from midnight UTC/GMT on January 1, 1970.
- `human` : human readable date and time, but not adjusted for the local time zone.
- `custom` : date text in the format specified by the format and field input fields.

Input field formats and fields only apply to custom output fields. For details and examples of how to generate custom formatted dates and times as text, see the Date-to-text function. Using a custom output field is equivalent to using the Date to Text function.