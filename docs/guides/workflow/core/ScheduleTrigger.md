


 Schedule Trigger
 [#](#schedule-trigger "Permanent link")
===========================================================



 Use the Schedule Trigger node run workflows at fixed intervals and times. This works in a similar way to the cron software utility in Unix-like systems.
 




 Cron node
 



 The Code node replaces the Cron node from version 0.199.0 onwards. If you're using an older version of n8n, you can still view the
 [Cron node documentation](https://github.com/n8n-io/n8n-docs/blob/67935ad2528e2e30d7984ea917e4af2910a096ec/docs/integrations/builtin/core-nodes/n8n-nodes-base.cron.md) 
 .
 





 Keep in mind
 


1. If a workflow uses the Schedule node as a trigger, make sure that you save and activate the workflow.
2. Set the timezone correctly for the n8n instance (or the workflow).




 Schedule your workflow
 [#](#schedule-your-workflow "Permanent link")
-----------------------------------------------------------------------



 Select an interval in
 **Trigger Interval** 
 . Once you select an interval, n8n displays more options to customize that interval.
 


### 
 Example
 [#](#example "Permanent link")



 In this example, schedule a workflow to run once a quarter, at the end of the quarter, at 09:00.
 


1. In
 **Trigger Interval** 
 , select
 **Months** 
 .
2. Change
 **Months Between Triggers** 
 to
 `3` 
 .
3. To run the workflow at the end of the month, change
 **Trigger at Day of Month** 
 to
 `28` 
 .
4. Change
 **Trigger at Hour** 
 to
 **9am** 
 . Leave
 **Trigger at Minute** 
 as its default,
 `0` 
 .



 Note that the Schedule Trigger uses the workflow timezone if available. Otherwise it uses the n8n instance timezone.
 



 Generate a custom cron expression
 [#](#generate-a-custom-cron-expression "Permanent link")
---------------------------------------------------------------------------------------------



 If you need a custom time setting, select
 **Trigger Interval** 
 >
 **Custom (Cron)** 
 .
 



 To generate a cron expression, you can use
 [crontab guru](https://crontab.guru) 
 . Paste the cron expression that you generated using crontab guru in the
 **Expression** 
 field in n8n.
 


### 
 Examples
 [#](#examples "Permanent link")



 If you want to trigger your workflow every day at 04:08:30, enter the following in the
 **Cron Expression** 
 field.
 


|  |  |
| --- | --- |
| 

```
1
```

 | 

```
30 8 4 * * *

```

 |







 If you want to trigger your workflow every day at 04:08, enter the following in the
 **Cron Expression** 
 field.
 


|  |  |
| --- | --- |
| 

```
1
```

 | 

```
8 4 * * *

```

 |






### 
 Why there are six asterisks (\*) in the cron expression?
 [#](#why-there-are-six-asterisks-in-the-cron-expression "Permanent link")



 The sixth asterisk in the cron expression represents seconds. Setting this is optional. The node will execute even if you don't set the value for seconds.
 




| 
 \*
  | 
 \*
  | 
 \*
  | 
 \*
  | 
 \*
  | 
 \*
  |
| --- | --- | --- | --- | --- | --- |
| 
 second
  | 
 minute
  | 
 hour
  | 
 day
  | 
 week
  | 
 month
  |




