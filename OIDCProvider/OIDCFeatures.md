# OIDC 三种流程
| 特性	| 授权码流程 | 隐式流程 |	混合流程 |
| ------- |------- | ------- | ------ |
| 所有 token 全部从授权路由返回 |	no |	yes	|no|
所有 token 都从 token 路由返回 |	yes	|no	|no|
token 不会暴露给前端 |	yes|	no|	no|
客户端可以被 AP 认证 |	yes|	no|	yes|
可以刷新 token |	yes|	no	|yes|
一次交互 |	no|	yes	|no|
必须服务器-服务器通信 |	yes|	no|	varies|


# 不同 response_type 对应的授权流程
|"response_type" value| Flow |
|---------------|-----|
code |	Authorization Code Flow|
id_token |	Implicit Flow|
id_token token |	Implicit Flow|
code id_token |	Hybrid Flow|
code token |	Hybrid Flow|
code id_token token |	Hybrid Flow|

[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#Authentication)