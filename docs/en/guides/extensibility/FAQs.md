# **FAQs**

## **Does the Pipeline function support async await syntax?**

Yes.

## **Can the Approw SDK be used in the Pipeline function?**

Yes, and no import and initialization are required.See the [available Node Modules for](https://docs.authing.cn/v2/guides/pipeline/available-node-modules.html) details.

## **Can I write Pipeline functions in other languages?**

Not for the time being, only Node is currently supported.

## *What are the precautions for writing Pipeline functions?**

- Please do not rename the pipe function.

- It is recommended not to hard code and use [environment variables](https://docs.authing.cn/v2/guides/pipeline/env.html) to store constant values.

## **What effect does refreshing the user pool secret have on the Pipeline function?**

Since the Approw Pipeline function runs completely in the cloud, refreshing the user pool secret will also update all the Pipeline functions in the user pool.This means that the Approw-js-sdk will not be able to be used normally in the Pipeline function within a short period of time.

## **What are the performance optimization methods?**

- If it is a function that is not directly related to the pipeline process, such as a new user registration notification, it can be [set to be executed asynchronously](https://docs.authing.cn/v2/guides/pipeline/pipeline-function-api-doc.html#%E8%AE%BE%E7%BD%AE%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C).