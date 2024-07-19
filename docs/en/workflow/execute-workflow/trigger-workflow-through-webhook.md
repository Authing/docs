# Trigger Workflow through Webhook


The way of invoking workflow  through Webhook is similar to the way <strong> through API </strong> interface. The difference is that, The Webhook method is more suitable for scenarios where asynchronous execution does not depend on the execution result. For example, after some actions occur in your system, asynchronously request the webhook address of workflow, but your system itself does not depend on the execution result of workflow.

When selecting a trigger, choose the "trigger through Webhook" method:

![](../static/IRyPbZcu5oGYZPxdPrrce9Y7nph.png)

You can copy the request address in the<strong> Webhook address </strong>section:

![](../static/EchAbaE8gorT4PxdtHucGkjMnJc.png)

## Obtain parameters passed in HTTP requests

The workflow triggered through Webhook obtains HTTP request parameters and API interface call methods in the same way. The request body, query parameters, and request header can all be obtained in the input of the workflow. For details, please refer to [Calling workflow through API interface](/en/workflow/execute-workflow/trigger-workflow-via-http-request.html).