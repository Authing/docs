# Map

You can use the Map function to transform the list into a new list by running a helper flow for each item in the list.

For example, if you have a helper stream that converts numbers to text (1 to "1"), you can use the Map function to run that helper stream over the entire list, converting from [1, 2, 3, 4, 5] to [“1”，“2”，“3”，“4”，“5”]. Similarly, you can use Map to generate a list of row subtotals from a list of spreadsheet rows (objects). With the Map function, the output list always has the same number of items as the input list.

## Define a helper flow with the Map function

Fill in the map card

Define a helper flow with the Map function

To use this function, you need a helper flow that accepts a single item in the list and calculates the value used by the new list. This helper stream is called once for each item in the list.

Define fields on the event card that will serve as input to help determine the corresponding values for the new list. At a minimum, you need to provide a field for the item in the list (you can name it whatever you want). The rest of the helper flow is then built, ending with a return card that provides the value for the same place in the new list. If the new list consists of items of type non-Object (for example, numbers or text), there should be a single return field of that type, the name of which does not matter. If the new list is going to be a list of objects, there should be several fields on the Return card: one for each key of the object, and the name of the field must match the key name.

## Fill in the map card

Update the following input fields:

list: Start list

Helper stream: A Helper stream that is invoked once for each item in the list

Use the following values (generated dynamically): Here, you will see a list of all the inputs required for the helper flow. You can use these fields as you would normal input fields, or (for at least one input) you can click the arrow to the right of the input to select Item to send the list item for that input to the helper stream. In some cases, you can also select a specific path within an object instead of an Item.

Concurrency (number): Displays the number of items in the list to be processed in parallel. If it is important to process items sequentially, use 1. Otherwise, a number like 5 or 10 will get your flow done faster.

The following output fields are displayed:

New List: Displays the list of results after the helper flow is executed on each project. Set the type of the new list to match the value returned by the helper flow, or Object if multiple values are returned.