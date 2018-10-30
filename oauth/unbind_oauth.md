# 用户解绑第三方 OAuth 账号

----------

若使用 ```JavaScript``` 调用，需要使用 ```then().catch()``` 捕获结果和错误。

#### Authing.unbindOAuth(options)

- **参数:**

  - ```{Object} options```
    - type ```{String} MUST, 暂时只支持github, wechat```
    - uesr ```{String} 用户ID，可选，默认为当前登录用户的ID```
    - client ```{String} 应用ID，可选，默认为当前登录应用的ID```

- **使用方法:**

  - ``` javascript
    Authing.unbindOAuth({
        type: 'github'
    });
    ```

- **返回数据:**

  - ``` javascript
    {
		"_id": "aeolkjhdhfhkkjdsfj",
		"user": "dfdfdsfdsfdsfdsfds",
	    "client": "dsfjdskfjkldsjfklj",
		"type": "github",
		"userInfo": "{"login":"demo","id":12345678,"node_id":"demodemodemo","avatar_url":"https://avatars1.githubusercontent.com/u/19266401?v=4","gravatar_id":"","url":"https://api.github.com/users/demo","html_url":"https://github.com/demo","followers_url":"https://api.github.com/users/demo/followers","following_url":"https://api.github.com/users/demo/following{/other_user}","gists_url":"https://api.github.com/users/demo/gists{/gist_id}","starred_url":"https://api.github.com/users/demo/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/demo/subscriptions","organizations_url":"https://api.github.com/users/demo/orgs","repos_url":"https://api.github.com/users/demo/repos","events_url":"https://api.github.com/users/demo/events{/privacy}","received_events_url":"https://api.github.com/users/demo/received_events","type":"User","site_admin":false,"name":"demo","company":null,"blog":"","location":null,"email":"demo@gmail.com","hireable":null,"bio":"A web developer.","public_repos":10,"public_gists":0,"followers":2,"following":3,"created_at":"2016-05-09T12:43:11Z","updated_at":"2018-07-23T04:42:08Z"}",
		"unionid": "12345678",
		"createdAt": "2016-05-09T12:43:11Z"
	}
    ```

