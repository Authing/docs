# Now

Calculate the current date and time in a variety of formats, all in UTC time (not adjusted for local time zones). Use the Date-to-text function to adjust the date to the time zone.

## Output parameters

- `date` : The complete date and time in ISO date format using the UTC Z symbol. For example: 2016-09-07T16:55:25.670Z.
- `iso` : Full date and time in ISO format using offset symbols. For example, 2016-09-07T16:55:25+00:00.
- `full` : expands the date and time in UTC format. For example, September 7, 2016 16:55:25.670.
- `minute` : indicates the current minute as a number.
- `hour` : indicates the current hour, which is the UTC time in 24 hours.
- `time` : The current time is a string of 24 hours in UTC time.
- `day` : indicates the current date in UTC time.
- `month` : indicates the current month, expressed in UTC time.
- `year` : indicates the current year, expressed in UTC time.
- `second`: indicates the current second as a number.
- `millisecond` : specifies the millisecond as a number.