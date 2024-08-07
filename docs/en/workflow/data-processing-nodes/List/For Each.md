# For Each

The list is processed by calling a helper flow for each item.

For Each function card does not return any output value. Add this card to the process when you want to take action on each item in the list but don't need any information in return.

## Use helper streams

To use this feature card, you must first build a helper flow for processing each item. See Helper Flows. The helper flow is invoked whenever an item in the list changes. You must also define the input values for the stream on the event card of the stream. Typically, an input is included for an item in the list. For example, if the list contains text values, then one of the inputs should be of type text. Other inputs can also be included.

If you need to know where the current item is in the list, use the Index field on the Helper Flow card.

## Update function cards For Each

On the For Each function card, add the list you want to use in the list field, and then select the stream you just built. The inputs will be filled in automatically, and then you can map the data to them.

To map the input to each item in the accept list, click the field and select the item from the drop-down list. If your list is a list of objects where you can see patterns for objects, choose to have your help flow accept these as input.

In addition, you can drag the output of previous cards in the stream, in which case the same value will be used for each item in this list.

## Enter parameters

- `list`: A list of values that are processed in the stream.
- `Helper Flow` : Specifies the helper flow that will be called once for each item in the list.
- `Various` : Input fields defined by the helper flow. These fields are generated dynamically when a helper flow is selected from the Choose flow dialog box.
- `concurrency` : indicates the number of concurrent entries in the list. If it is important to process items in order, enter 1. Otherwise, larger numbers (like 5 or 10) will make your stream complete faster.