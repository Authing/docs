!!!include(en/common/init-python-auth-sdk.md)!!!

设置自定义字段：

```python
# 设置 int 类型数据
authentication_client.set_udv(
  key="age",
  value=15
)

# 设置 boolen 类型数据
authentication_client.set_udv(
  key="is_ok",
  value=True
)
```

获取该用户最新的自定义数据：

```python
udvs = authentication_client.list_udv()
```
