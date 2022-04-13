---
meta:
  - name: description
    content: Management organization
---

# Management organization

<LastUpdated/>

> A {{$localeConfig.brandName}} the userpool can create multiple organizations. This module is used to manage the {{$localeConfig.brandName}} organization, which can be used to delete and deduct the organization, add a delete mobile node, and import an organization.

## Create an organization

> Creating an organization, creating an organization of only one node.
> If you want to import a complete organization tree, use the importByJson method.

```python
def create(self, name, code=None, description=None)
```

#### parameter

- `name` \<str\> Organizational name, this name will be the name of the root node of the organization
- `code` \<str\> The only sign of root node, must be a legitimate English character
- `description` \<str\> Root node description

#### Example

```python
management.org.create("xx2")
```

#### Sample data

```json
{
  "nodes": [
    {
      "code": null,
      "description": null,
      "updatedAt": "2021-09-23T08:17:38+00:00",
      "children": [],
      "order": null,
      "descriptionI18n": null,
      "depth": 0,
      "orgId": "614c3822355bb8538eb5",
      "path": ["614c3822aafcfc1defae"],
      "nameI18n": null,
      "root": true,
      "id": "614c3822aafcfc1defaedbfd",
      "createdAt": "2021-09-23T08:17:38+00:00",
      "name": "xx21"
    }
  ],
  "rootNode": {
    "code": null,
    "description": null,
    "updatedAt": "2021-09-23T08:17:38+00:00",
    "children": [],
    "order": null,
    "descriptionI18n": null,
    "depth": null,
    "orgId": "614c3822355bb8538eb5",
    "path": ["614c3822aafcfc1defae"],
    "nameI18n": null,
    "root": true,
    "id": "614c3822aafcfc1defae",
    "createdAt": "2021-09-23T08:17:38+00:00",
    "name": "xx21"
  },
  "id": "614c3822355bb8538eb5"
}
```

## Delete organization

> Delete organization

```python
def delete_by_id(self, id)
```

#### parameter

- `id` \<str\> organization ID

#### Example

```python
 management.org.delete_by_id('orgid')
```

#### Sample data

```json
{
  "message": "delete org succeed",
  "code": 200
}
```

## Get list of user pool organization

> Get list of user pool organization

```python
def list(self, page=1, limit=10, treeify=False)
```

#### parameter

- `page` \<int\> Page number default is: `1`
- `limit` \<int\> The number of records per page is: `10`
- `treeify` \<bool\> Return the result is tree

#### Example

```python
management.org.list(treeify=True)
```

#### Sample data

```json
{
  "totalCount": 1,
  "list": [
    {
      "nodes": [
        {
          "code": "codes",
          "description": "",
          "updatedAt": "2021-09-16T10:24:03+00:00",
          "children": [
            {
              "code": null,
              "description": null,
              "updatedAt": "2021-09-16T06:35:22+00:00",
              "children": [
                {
                  "code": null,
                  "description": null,
                  "updatedAt": "2021-09-16T06:46:11+00:00",
                  "children": [],
                  "order": null,
                  "descriptionI18n": null,
                  "depth": 2,
                  "nameI18n": null,
                  "path": [
                    "6142c2c4f8abf18c6c978b2c",
                    "6142c32360021c1a05081579",
                    "6142e833716601219e93d813"
                  ],
                  "root": false,
                  "id": "6142e833716601219e93d813",
                  "createdAt": "2021-09-16T06:46:11+00:00",
                  "name": "q2"
                },
                {
                  "code": null,
                  "description": null,
                  "updatedAt": "2021-09-16T06:46:20+00:00",
                  "children": [],
                  "order": null,
                  "descriptionI18n": null,
                  "depth": 2,
                  "nameI18n": null,
                  "path": [
                    "6142c2c4f8abf18c6c978b2c",
                    "6142c32360021c1a05081579",
                    "6142e83c8db6a68ea5e62aca"
                  ],
                  "root": false,
                  "id": "6142e83c8db6a68ea5e62aca",
                  "createdAt": "2021-09-16T06:46:20+00:00",
                  "name": "q3"
                }
              ],
              "order": null,
              "descriptionI18n": null,
              "depth": 1,
              "nameI18n": null,
              "path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579"],
              "root": false,
              "id": "6142c32360021c1a05081579",
              "createdAt": "2021-09-16T04:08:03+00:00",
              "name": "qqqx"
            },
            {
              "code": null,
              "description": null,
              "updatedAt": "2021-09-16T06:12:04+00:00",
              "children": [
                {
                  "code": "code",
                  "description": "",
                  "updatedAt": "2021-09-16T10:20:39+00:00",
                  "children": [],
                  "order": null,
                  "descriptionI18n": null,
                  "depth": 2,
                  "nameI18n": null,
                  "path": [
                    "6142c2c4f8abf18c6c978b2c",
                    "6142e03436f09aa7e66c1935",
                    "6142e08f64d5a8873598e9fb"
                  ],
                  "root": false,
                  "id": "6142e08f64d5a8873598e9fb",
                  "createdAt": "2021-09-16T06:13:35+00:00",
                  "name": "add"
                }
              ],
              "order": null,
              "descriptionI18n": null,
              "depth": 1,
              "nameI18n": null,
              "path": ["6142c2c4f8abf18c6c978b2c", "6142e03436f09aa7e66c1935"],
              "root": false,
              "id": "6142e03436f09aa7e66c1935",
              "createdAt": "2021-09-16T06:12:04+00:00",
              "name": "add"
            },
            {
              "code": null,
              "description": null,
              "updatedAt": "2021-09-16T06:12:24+00:00",
              "children": [],
              "order": null,
              "descriptionI18n": null,
              "depth": 1,
              "nameI18n": null,
              "path": ["6142c2c4f8abf18c6c978b2c", "6142e0483f54818690c99600"],
              "root": false,
              "id": "6142e0483f54818690c99600",
              "createdAt": "2021-09-16T06:12:24+00:00",
              "name": "add"
            },
            {
              "code": null,
              "description": null,
              "updatedAt": "2021-09-16T06:13:18+00:00",
              "children": [],
              "order": null,
              "descriptionI18n": null,
              "depth": 1,
              "nameI18n": null,
              "path": ["6142c2c4f8abf18c6c978b2c", "6142e07e163a22fd3db10e83"],
              "root": false,
              "id": "6142e07e163a22fd3db10e83",
              "createdAt": "2021-09-16T06:13:18+00:00",
              "name": "add"
            }
          ],
          "order": null,
          "descriptionI18n": null,
          "depth": 0,
          "nameI18n": null,
          "path": ["6142c2c4f8abf18c6c978b2c"],
          "root": true,
          "id": "6142c2c4f8abf18c6c978b2c",
          "createdAt": "2021-09-16T04:06:28+00:00",
          "name": "xx2"
        }
      ],
      "rootNode": {
        "code": "codes",
        "description": "",
        "updatedAt": "2021-09-16T10:24:03+00:00",
        "children": [
          "6142c32360021c1a05081579",
          "6142e03436f09aa7e66c1935",
          "6142e0483f54818690c99600",
          "6142e07e163a22fd3db10e83"
        ],
        "order": null,
        "descriptionI18n": null,
        "depth": null,
        "path": ["6142c2c4f8abf18c6c978b2c"],
        "nameI18n": null,
        "root": true,
        "id": "6142c2c4f8abf18c6c978b2c",
        "createdAt": "2021-09-16T04:06:28+00:00",
        "name": "xx2"
      },
      "id": "6142c2c41c6e6c6cc3edfd88"
    }
  ]
}
```

## According to the node ID query node

> According to the node ID query node

```python
def get_node_by_id(self, node_id)
```

#### parameter

- `node_id` \<str\> node ID

#### Example

```python
management.org.get_node_by_id("nodeid")
```

#### Sample data

```json
{
  "code": null,
  "description": null,
  "updatedAt": "2021-09-16T06:35:22+00:00",
  "children": ["6142e833716601219e93d813", "6142e83c8db6a68ea5e62aca"],
  "order": null,
  "descriptionI18n": null,
  "depth": null,
  "orgId": "6142c2c41c6e6c6cc3edfd88",
  "path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579"],
  "nameI18n": null,
  "root": false,
  "id": "6142c32360021c1a0508",
  "createdAt": "2021-09-16T04:08:03+00:00",
  "name": "qqqx"
}
```

## Add node

> Add a node in an organization

```python
def add_node(self, org_id, name, parent_node_id,
 code=None, description=None, order=None, name_i18n=None, description_i18n=None)
```

#### parameter

- `org_id` \<str\> organization ID
- `parent_node_id` \<str\> Parent node ID
- `name` \<str\> Node name
- `name_i18n` \<str\> Node name internationalization
- `code` \<str\> Node unique logo
- `description` \<str\> Node Description Information
- `description_i18n` \<str\> Node describes internationalization

#### Example

```python
management.org.add_node(org_id='6142c2c41c6e6c6cc3edf8',
                        parent_node_id='6142c2c4f8abf18c6c978c',
                        name='add')
```

#### Sample data

```json
{
  "nodes": [
    {
      "code": null,
      "description": null,
      "updatedAt": "2021-09-23T08:35:31+00:00",
      "children": [],
      "order": null,
      "descriptionI18n": null,
      "depth": 1,
      "orgId": "6142c2c41c6e6c6cc3edf8",
      "path": ["6142c2c4f8abf18c6c978b2c", "614c3c5372b6b3f340ab6937"],
      "nameI18n": null,
      "root": false,
      "id": "614c3c5372b6b3f340ab6937",
      "createdAt": "2021-09-23T08:35:31+00:00",
      "name": "add"
    }
  ],
  "rootNode": {
    "code": "codes",
    "description": "",
    "updatedAt": "2021-09-16T10:24:03+00:00",
    "children": [
      "614c3c5372b6b3f340ab6937",
      "6142c32360021c1a05081579",
      "6142e03436f09aa7e66c1935",
      "6142e0483f54818690c99600",
      "6142e07e163a22fd3db10e83"
    ],
    "order": null,
    "descriptionI18n": null,
    "depth": null,
    "orgId": "6142c2c41c6e6c6cc3edfd88",
    "path": ["6142c2c4f8abf18c6c978b2c"],
    "nameI18n": null,
    "root": true,
    "id": "6142c2c4f8abf18c6c978b2c",
    "createdAt": "2021-09-16T04:06:28+00:00",
    "name": "xx2"
  },
  "id": "6142c2c41c6e6c6cc3edfd88"
}
```

## Modify node

> Modify node data

```python
def update_node(self, node_id, name=None, code=None, description=None)
```

#### parameter

- `id` \<str\> Node unique logo
- `code` \<str\> Node unique logo
- `name` \<str\> Node name
- `description` \<str\> Node Description Information

#### Example

```python
management.org.update_node('6142c32360021c1a05081579', name='qqqx')
```

#### Sample data

```json
{
  "code": null,
  "description": null,
  "updatedAt": "2021-09-16T06:35:22+00:00",
  "children": ["6142e833716601219e93d813", "6142e83c8db6a68ea5e62aca"],
  "order": null,
  "descriptionI18n": null,
  "depth": null,
  "orgId": "6142c2c41c6e6c6cc3edfd88",
  "path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579"],
  "nameI18n": null,
  "users": {
    "totalCount": 1
  },
  "root": false,
  "id": "6142c32360021c1a05081579",
  "createdAt": "2021-09-16T04:08:03+00:00",
  "name": "qqqx"
}
```

## Get organizational institution details

> Get the organization's details through organizational ID

```python
def find_by_id(self, org_id, treeify=False)
```

#### parameter

- `org_id` \<str\> organization ID
- `treeify` \<bool\> The result is tree

#### Example

```python
management.org.find_by_id('6142c2c41c6e6c6cc3edfd88',treeify=True)
```

#### Sample data

```json
{
  "nodes": [
    {
      "code": "codes",
      "description": "",
      "updatedAt": "2021-09-16T10:24:03+00:00",
      "children": [
        {
          "code": null,
          "description": null,
          "updatedAt": "2021-09-23T08:35:31+00:00",
          "children": [],
          "order": null,
          "descriptionI18n": null,
          "depth": 1,
          "orgId": "6142c2c41c6e6c6cc3edfd88",
          "path": ["6142c2c4f8abf18c6c978b2c", "614c3c5372b6b3f340ab6937"],
          "nameI18n": null,
          "root": false,
          "id": "614c3c5372b6b3f340ab6937",
          "createdAt": "2021-09-23T08:35:31+00:00",
          "name": "add"
        }
      ],
      "rootNode": {
        "code": "codes",
        "description": "",
        "updatedAt": "2021-09-16T10:24:03+00:00",
        "children": [
          "614c3c5372b6b3f340ab6937",
          "6142c32360021c1a05081579",
          "6142e03436f09aa7e66c1935",
          "6142e0483f54818690c99600",
          "6142e07e163a22fd3db10e83"
        ],
        "order": null,
        "descriptionI18n": null,
        "depth": null,
        "orgId": "6142c2c41c6e6c6cc3edfd88",
        "path": ["6142c2c4f8abf18c6c978b2c"],
        "nameI18n": null,
        "root": true,
        "id": "6142c2c4f8abf18c6c978b2c",
        "createdAt": "2021-09-16T04:06:28+00:00",
        "name": "xx2"
      },
      "id": "6142c2c41c6e6c6cc3edfd88"
    }
  ]
}
```

## Delete node

> Delete a node in the organizational tree

```python
def delete_node(self, org_id, node_id)
```

#### parameter

- `org_id` \<str\> organization ID
- `node_id` \<str\> node ID

#### Example

```python
 management.org.delete_node(org_id="6142c2c41c6e6c6cc3edfd88", node_id='6142dfc193be89f7dfacf991')
```

#### Sample data

```json
{
  "message": "successfully deleted",
  "code": 200
}
```

## Mobile node

> Moving an organization node, when moving a node, you need to specify the new parent of the node. Note You cannot move a node below your child node.

```python
def move_node(self, org_id, node_id, target_parent_id, treeify=False)
```

#### parameter

- `org_id` \<str\> organization ID
- `node_id` \<str\> Need to move the node ID
- `target_parent_id` \<str\> Target parent node ID
- `treeify` \<bool\> The result is tree

#### Example

```python
management.org.move_node(org_id="6142c2c41c6e6c6cc3edfd88",
                        node_id='6142e08f64d5a8873598e9fb',
                        target_parent_id='6142e03436f09aa7e66c1935')
```

#### Sample data

```json
{
  "nodes": [
    {
      "code": "codes",
      "description": "",
      "updatedAt": "2021-09-16T10:24:03+00:00",
      "children": [
        {
          "code": null,
          "description": null,
          "updatedAt": "2021-09-23T08:35:31+00:00",
          "children": [],
          "order": null,
          "descriptionI18n": null,
          "depth": 1,
          "orgId": "6142c2c41c6e6c6cc3edfd88",
          "path": ["6142c2c4f8abf18c6c978b2c", "614c3c5372b6b3f340ab6937"],
          "nameI18n": null,
          "root": false,
          "id": "614c3c5372b6b3f340ab6937",
          "createdAt": "2021-09-23T08:35:31+00:00",
          "name": "add"
        }
      ],
      "rootNode": {
        "code": "codes",
        "description": "",
        "updatedAt": "2021-09-16T10:24:03+00:00",
        "children": [
          "614c3c5372b6b3f340ab6937",
          "6142c32360021c1a05081579",
          "6142e03436f09aa7e66c1935",
          "6142e0483f54818690c99600",
          "6142e07e163a22fd3db10e83"
        ],
        "order": null,
        "descriptionI18n": null,
        "depth": null,
        "orgId": "6142c2c41c6e6c6cc3edfd88",
        "path": ["6142c2c4f8abf18c6c978b2c"],
        "nameI18n": null,
        "root": true,
        "id": "6142c2c4f8abf18c6c978b2c",
        "createdAt": "2021-09-16T04:06:28+00:00",
        "name": "xx2"
      },
      "id": "6142c2c41c6e6c6cc3edfd88"
    }
  ]
}
```

## Judgment is the root node

> Judging a node is not the root node of the tissue tree

```python
def is_root_node(self, org_id, node_id)
```

#### parameter

- `node_id` \<str\> Organizational node ID
- `org_id` \<str\> organization ID

#### Example

```python
management.org.is_root_node(org_id="6142c2c41c6e6c6cc3edfd88",node_id='6142e08f64d5a8873598e9fb')
```

#### Sample data

```python
bool
```

## Get a list of child nodes

> Query a list of child nodes in a node

```python
def list_children(self, node_id)
```

#### parameter

- `node_id` \<str\> organization ID

#### Example

```python
management.org.list_children("6142c32360021c1a05081579")
```

#### Sample data

```json
[
  {
    "code": null,
    "description": null,
    "updatedAt": "2021-09-16T06:46:11+00:00",
    "children": [],
    "order": null,
    "descriptionI18n": null,
    "depth": 1,
    "orgId": "6142c2c41c6e6c6cc3edfd88",
    "path": [
      "6142c2c4f8abf18c6c978b2c",
      "6142c32360021c1a05081579",
      "6142e833716601219e93d813"
    ],
    "nameI18n": null,
    "root": false,
    "id": "6142e833716601219e93d813",
    "createdAt": "2021-09-16T06:46:11+00:00",
    "name": "q2"
  }
]
```

## Fuzzy search organization node

> Blur search organization node by node name

```python
def search_nodes(self, keyword)
```

#### parameter

- `keyword` \<str\> Organizational Name Keyword

#### Example

```python
management.org.search_nodes("xx2")
```

#### Sample data

```json
[
  {
    "code": null,
    "description": null,
    "updatedAt": "2021-09-16T06:46:11+00:00",
    "children": [],
    "order": null,
    "descriptionI18n": null,
    "depth": 1,
    "orgId": "6142c2c41c6e6c6cc3edfd88",
    "path": [
      "6142c2c4f8abf18c6c978b2c",
      "6142c32360021c1a05081579",
      "6142e833716601219e93d813"
    ],
    "nameI18n": null,
    "root": false,
    "id": "6142e833716601219e93d813",
    "createdAt": "2021-09-16T06:46:11+00:00",
    "name": "q2"
  }
]
```

## Get root nodes

> Get a root node of an organization

```python
def root_node(self, org_id)
```

#### parameter

- `org_id` \<str\> organization ID

#### Example

```python
management.org.root_node("6142c2c41c6e6c6cc3edfd88")
```

#### Sample data

```json
{
  "code": "codes",
  "description": "",
  "updatedAt": "2021-09-16T10:24:03+00:00",
  "children": [
    "614c3f54d02c0253e13de53e",
    "6142c32360021c1a05081579",
    "6142e03436f09aa7e66c1935",
    "6142e0483f54818690c99600",
    "6142e07e163a22fd3db10e83"
  ],
  "namePath": ["xx2"],
  "order": null,
  "descriptionI18n": null,
  "depth": null,
  "orgId": "6142c2c41c6e6c6cc3edfd88",
  "path": ["6142c2c4f8abf18c6c978b2c"],
  "nameI18n": null,
  "codePath": ["codes"],
  "root": true,
  "id": "6142c2c4f8abf18c6c978b2c",
  "createdAt": "2021-09-16T04:06:28+00:00",
  "name": "xx2"
}
```

## Import through JSON

> Import organization through a JSON tree structure

```python
def import_by_json(self, json_str)
```

#### parameter

- `json_str` \<str\> Tree structure in JSON format, see sample code for detailed format

#### Example

```python
json ="""
                {
                    "name": "北京非凡科技有限公司",
                    "code": "feifan",
                    "children": [{

                    "code": "operation",
                    "name": "运营",
                    "description": "商业化部门"
                },
                {

                    "code": "dev",
                    "name": "研发",
                    "description": "研发部门",
                    "children": [{

                        "code": "backend",
                        "name": "后端",
                        "description": "后端研发部门"
                    }]
                }
            ]
            } """
        management.org.import_by_json(json)
```

## Add member

> Node Add member

```python
def add_members(self, node_id, user_ids)
```

#### parameter

- `node_id` \<str\> Node ID
- `user_ids` \<list\> User ID list

#### Example

```python
management.org.add_members("6142e833716601219e93d813",["6141876341abedef979c3740"])
```

#### Sample data

```json
{
  "code": null,
  "description": null,
  "updatedAt": "2021-09-16T06:46:11+00:00",
  "children": [],
  "order": null,
  "descriptionI18n": null,
  "depth": null,
  "orgId": "6142c2c41c6e6c6cc3edfd88",
  "path": [
    "6142c2c4f8abf18c6c978b2c",
    "6142c32360021c1a05081579",
    "6142e833716601219e93d813"
  ],
  "nameI18n": null,
  "users": {
    "totalCount": 1,
    "list": [
      {
        "status": "Activated",
        "preferredUsername": null,
        "tokenExpiredAt": "2021-10-06T07:32:16+00:00",
        "locale": null,
        "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
        "updatedAt": "2021-09-22T07:32:16+00:00",
        "formatted": null,
        "device": null,
        "gender": "U",
        "id": "6141876341abedef979c3740",
        "arn": "arn:cn:authing:61384d3e302f1f75e69ce95a:user:6141876341abedef979c3740",
        "blocked": false,
        "loginsCount": 22,
        "city": null,
        "province": null,
        "userPoolId": "61384d3e302f1f75e69ce95a",
        "locality": null,
        "middleName": null,
        "country": null,
        "zoneinfo": null,
        "lastIP": "111.202.167.54",
        "website": null,
        "streetAddress": null,
        "externalId": null,
        "isDeleted": false,
        "postalCode": null,
        "email": "fptvmzqyxn@authing.cn",
        "username": null,
        "openid": null,
        "company": null,
        "familyName": null,
        "phone": null,
        "registerSource": ["basic:email"],
        "profile": null,
        "address": null,
        "oauth": null,
        "password": "b9c6556b58ad1b450f9f6487efdd0eaf",
        "nickname": null,
        "createdAt": "2021-09-15T05:40:51+00:00",
        "givenName": null,
        "name": null,
        "emailVerified": false,
        "region": null,
        "birthdate": null,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cGRhdGVkX2F0IjoiMjAyMS0wOS0yMlQwNzozMTowOC43NThaIiwiYWRkcmVzcyI6eyJjb3VudHJ5IjpudWxsLCJwb3N0YWxfY29kZSI6bnVsbCwicmVnaW9uIjpudWxsLCJmb3JtYXR0ZWQiOm51bGx9LCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOm51bGwsImxvY2FsZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImJpcnRoZGF0ZSI6bnVsbCwiZ2VuZGVyIjoiVSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZW1haWwiOiJmcHR2bXpxeXhuQGF1dGhpbmcuY24iLCJ3ZWJzaXRlIjpudWxsLCJwaWN0dXJlIjoiaHR0cHM6Ly9maWxlcy5hdXRoaW5nLmNvL2F1dGhpbmctY29uc29sZS9kZWZhdWx0LXVzZXItYXZhdGFyLnBuZyIsInByb2ZpbGUiOm51bGwsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJmYW1pbHlfbmFtZSI6bnVsbCwiZ2l2ZW5fbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwic3ViIjoiNjE0MTg3NjM0MWFiZWRlZjk3OWMzNzQwIiwiZXh0ZXJuYWxfaWQiOm51bGwsInVuaW9uaWQiOm51bGwsImRhdGEiOnsidHlwZSI6InVzZXIiLCJ1c2VyUG9vbElkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIiwiYXBwSWQiOiI2MTM4NGQzZWUxYjgxZGQxMzQyZTU2MzUiLCJpZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsInVzZXJJZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsIl9pZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsInBob25lIjpudWxsLCJlbWFpbCI6ImZwdHZtenF5eG5AYXV0aGluZy5jbiIsInVzZXJuYW1lIjpudWxsLCJ1bmlvbmlkIjpudWxsLCJvcGVuaWQiOm51bGwsImNsaWVudElkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIn0sInVzZXJwb29sX2lkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIiwiYXVkIjoiNjEzODRkM2VlMWI4MWRkMTM0MmU1NjM1IiwiZXhwIjoxNjMzNTA1NTM2LCJpYXQiOjE2MzIyOTU5MzYsImlzcyI6Imh0dHBzOi8vbjFzajY4LWRlbW8uYXV0aGluZy5jbi9vaWRjIn0.AbHOb16fKlz463533NdgMNtCW9n29u9aamS-LiKAOfQ",
        "phoneVerified": false,
        "lastLogin": "2021-09-22T07:32:16+00:00",
        "unionid": null,
        "browser": null,
        "signedUp": "2021-09-15T05:40:51+00:00"
      }
    ]
  },
  "root": false,
  "id": "6142e833716601219e93d813",
  "createdAt": "2021-09-16T06:46:11+00:00",
  "name": "q2"
}
```

## Get node members

> Get a member member, you can get the user directly added to the node, or you can get the user of the node node.

```python
def list_members(self,node_id, page=None,limit=None, include_children_nodes=None)
```

#### parameter

- `page` \<int\> Page number default is: `1`
- `limit` \<int\> The number of records per page is: `10`
- `include_children_nodes` \<bool\> Whether to get the default value of all child nodes: `false`
- `node_id` \<str\> ndoe ID

#### Example

```python
management.org.list_members(node_id='6142e833716601219e93d813',page=2)
```

#### Sample data

```json
{
  "code": null,
  "description": null,
  "updatedAt": "2021-09-16T06:46:11+00:00",
  "children": [],
  "order": null,
  "descriptionI18n": null,
  "depth": null,
  "orgId": "6142c2c41c6e6c6cc3edfd88",
  "path": [
    "6142c2c4f8abf18c6c978b2c",
    "6142c32360021c1a05081579",
    "6142e833716601219e93d813"
  ],
  "nameI18n": null,
  "users": {
    "totalCount": 1,
    "list": [
      {
        "status": "Activated",
        "preferredUsername": null,
        "tokenExpiredAt": "2021-10-06T07:32:16+00:00",
        "locale": null,
        "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
        "updatedAt": "2021-09-22T07:32:16+00:00",
        "formatted": null,
        "device": null,
        "gender": "U",
        "id": "6141876341abedef979c3740",
        "arn": "arn:cn:authing:61384d3e302f1f75e69ce95a:user:6141876341abedef979c3740",
        "blocked": false,
        "loginsCount": 22,
        "city": null,
        "province": null,
        "userPoolId": "61384d3e302f1f75e69ce95a",
        "locality": null,
        "middleName": null,
        "country": null,
        "zoneinfo": null,
        "lastIP": "111.202.167.54",
        "website": null,
        "streetAddress": null,
        "externalId": null,
        "isDeleted": false,
        "postalCode": null,
        "email": "fptvmzqyxn@authing.cn",
        "username": null,
        "openid": null,
        "company": null,
        "familyName": null,
        "phone": null,
        "registerSource": ["basic:email"],
        "profile": null,
        "address": null,
        "oauth": null,
        "password": "b9c6556b58ad1b450f9f6487efdd0eaf",
        "nickname": null,
        "createdAt": "2021-09-15T05:40:51+00:00",
        "givenName": null,
        "name": null,
        "emailVerified": false,
        "region": null,
        "birthdate": null,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cGRhdGVkX2F0IjoiMjAyMS0wOS0yMlQwNzozMTowOC43NThaIiwiYWRkcmVzcyI6eyJjb3VudHJ5IjpudWxsLCJwb3N0YWxfY29kZSI6bnVsbCwicmVnaW9uIjpudWxsLCJmb3JtYXR0ZWQiOm51bGx9LCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOm51bGwsImxvY2FsZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImJpcnRoZGF0ZSI6bnVsbCwiZ2VuZGVyIjoiVSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZW1haWwiOiJmcHR2bXpxeXhuQGF1dGhpbmcuY24iLCJ3ZWJzaXRlIjpudWxsLCJwaWN0dXJlIjoiaHR0cHM6Ly9maWxlcy5hdXRoaW5nLmNvL2F1dGhpbmctY29uc29sZS9kZWZhdWx0LXVzZXItYXZhdGFyLnBuZyIsInByb2ZpbGUiOm51bGwsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJmYW1pbHlfbmFtZSI6bnVsbCwiZ2l2ZW5fbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwic3ViIjoiNjE0MTg3NjM0MWFiZWRlZjk3OWMzNzQwIiwiZXh0ZXJuYWxfaWQiOm51bGwsInVuaW9uaWQiOm51bGwsImRhdGEiOnsidHlwZSI6InVzZXIiLCJ1c2VyUG9vbElkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIiwiYXBwSWQiOiI2MTM4NGQzZWUxYjgxZGQxMzQyZTU2MzUiLCJpZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsInVzZXJJZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsIl9pZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsInBob25lIjpudWxsLCJlbWFpbCI6ImZwdHZtenF5eG5AYXV0aGluZy5jbiIsInVzZXJuYW1lIjpudWxsLCJ1bmlvbmlkIjpudWxsLCJvcGVuaWQiOm51bGwsImNsaWVudElkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIn0sInVzZXJwb29sX2lkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIiwiYXVkIjoiNjEzODRkM2VlMWI4MWRkMTM0MmU1NjM1IiwiZXhwIjoxNjMzNTA1NTM2LCJpYXQiOjE2MzIyOTU5MzYsImlzcyI6Imh0dHBzOi8vbjFzajY4LWRlbW8uYXV0aGluZy5jbi9vaWRjIn0.AbHOb16fKlz463533NdgMNtCW9n29u9aamS-LiKAOfQ",
        "phoneVerified": false,
        "lastLogin": "2021-09-22T07:32:16+00:00",
        "unionid": null,
        "browser": null,
        "signedUp": "2021-09-15T05:40:51+00:00"
      }
    ]
  },
  "root": false,
  "id": "6142e833716601219e93d813",
  "createdAt": "2021-09-16T06:46:11+00:00",
  "name": "q2"
}
```

## Delete member

> Delete node members

```python
def delete_members(self, node_id, user_ids)
```

#### parameter

- `node_id` \<str\> node ID
- `user_ids` \<list\> user ID list

#### Example

```python
management.org.delete_members("6142e08f64d5a8873598e9fb",["6141876341abedef979c3740"])
```

#### Sample data

```json
{
  "code": null,
  "description": null,
  "updatedAt": "2021-09-16T06:46:11+00:00",
  "children": [],
  "order": null,
  "descriptionI18n": null,
  "depth": null,
  "orgId": "6142c2c41c6e6c6cc3edfd88",
  "path": [
    "6142c2c4f8abf18c6c978b2c",
    "6142c32360021c1a05081579",
    "6142e833716601219e93d813"
  ],
  "nameI18n": null,
  "users": {
    "totalCount": 0,
    "list": []
  },
  "root": false,
  "id": "6142e833716601219e93d813",
  "createdAt": "2021-09-16T06:46:11+00:00",
  "name": "q2"
}
```

## Export all organization data

> Export all organizational institutions, the returned data structure is a recursive number structure.

```python
def export_all(self)
```

#### Example

```python
management.org.export_all()
```

#### Sample data

```json
{
  "message": "Export data success",
  "code": 200,
  "data": [
    {
      "leaderUserId": null,
      "code": "codes",
      "name": "xx2",
      "userPoolId": "61384d3e302f1f75e69ce95a",
      "source": null,
      "sourceData": null,
      "dataVersion": null,
      "__groupid": null,
      "__id": null,
      "order": null,
      "descriptionI18n": null,
      "__parentid": null,
      "orgId": "6142c2c41c6e6c6cc3edfd88",
      "members": [],
      "updatedAt": "2021-09-16T10:24:03.370Z",
      "nameI18n": null,
      "children": [
        {
          "leaderUserId": null,
          "code": null,
          "name": "add",
          "userPoolId": "61384d3e302f1f75e69ce95a",
          "source": [],
          "sourceData": null,
          "dataVersion": null,
          "__groupid": null,
          "__id": null,
          "order": null,
          "descriptionI18n": null,
          "__parentid": null,
          "orgId": "6142c2c41c6e6c6cc3edfd88",
          "members": [],
          "updatedAt": "2021-09-23T08:48:20.338Z",
          "nameI18n": null,
          "children": [],
          "id": "614c3f54d02c0253e13de53e",
          "createdAt": "2021-09-23T08:48:20.338Z",
          "description": null
        }
      ],
      "id": "6142c2c4f8abf18c6c978b2c",
      "createdAt": "2021-09-16T04:06:28.097Z",
      "description": ""
    }
  ]
}
```

## Import a organization data

> Import a organization data

```python
def export_by_org_id(self,org_id)
```

#### parameter

- `org_id` \<str\> organization ID

#### Example

```python
management.org.export_by_org_id('6142c2c41c6e6c6cc3edfd88')
```

#### Sample data

```json
{
  "message": "Export data success",
  "code": 200,
  "data": [
    {
      "leaderUserId": null,
      "code": "codes",
      "name": "xx2",
      "userPoolId": "61384d3e302f1f75e69ce95a",
      "source": null,
      "sourceData": null,
      "dataVersion": null,
      "__groupid": null,
      "__id": null,
      "order": null,
      "descriptionI18n": null,
      "__parentid": null,
      "orgId": "6142c2c41c6e6c6cc3edfd88",
      "members": [],
      "updatedAt": "2021-09-16T10:24:03.370Z",
      "nameI18n": null,
      "children": [
        {
          "leaderUserId": null,
          "code": null,
          "name": "add",
          "userPoolId": "61384d3e302f1f75e69ce95a",
          "source": [],
          "sourceData": null,
          "dataVersion": null,
          "__groupid": null,
          "__id": null,
          "order": null,
          "descriptionI18n": null,
          "__parentid": null,
          "orgId": "6142c2c41c6e6c6cc3edfd88",
          "members": [],
          "updatedAt": "2021-09-23T08:48:20.338Z",
          "nameI18n": null,
          "children": [],
          "id": "614c3f54d02c0253e13de53e",
          "createdAt": "2021-09-23T08:48:20.338Z",
          "description": null
        }
      ],
      "id": "6142c2c4f8abf18c6c978b2c",
      "createdAt": "2021-09-16T04:06:28.097Z",
      "description": ""
    }
  ]
}
```

## Get all resource lists authorized by the department

> Get all resource lists authorized by the department

```python
def list_authorized_resources(self, node_id, namespace=None, resource_type=None)
```

#### parameter

- `node_id` \<str\> Department ID
- `namespace` \<str\> Code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md)
- `resourceType` \<str\> Optional, resource type, default will return all permissions, existing resource types are as follows:
  - `resource_type`: type of data;
  - `API`: API Type data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data.

#### Example

```python
management.org.list_authorized_resources(
            node_id=node_id,
            namespace='default'
        )
```

#### Sample data

```json
{
  "totalCount": 12,
  "list": [
    {
      "code": "menu_a",
      "type": "MENU"
    },
    {
      "code": "menu_b",
      "type": "MENU"
    },
    {
      "code": "books:1",
      "type": "DATA",
      "actions": ["books:delete", "books:update"]
    }
  ]
}
```

## Get all resources authorized by organizational nodes

> Get all resources authorized by the organization node.

```python
def list_authorized_resources_by_code(self, org_id, code, namespace=None, resource_type=None)
```

#### parameter

- `org_id` \<str\> Department ID
- `code` \<str\> resource code
- `namespace` \<str\> Code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md)
- `resource_type` \<str\> Optional, resource type, default will return all permissions, existing resource types are as follows:
  - `DATA`: type of data;
  - `API`: API Type data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data.

#### Example

```python
management.org.list_authorized_resources_by_code(
            org_id=node_id,
            code='code'
            namespace='default'
        )
```

#### Sample data

```json
{
  "totalCount": 12,
  "list": [
    {
      "code": "menu_a",
      "type": "MENU"
    },
    {
      "code": "menu_b",
      "type": "MENU"
    },
    {
      "code": "books:1",
      "type": "DATA",
      "actions": ["books:delete", "books:update"]
    }
  ]
}
```

## Set the user main department

> Set the user main department

```python
def set_main_department(self, user_id, department_id)
```

#### parameter

- `user_id` \<str\> user ID
- `department_id` \<str\> Department ID

#### Example

```python
management.org.set_main_department("6141876341abedef979c3740","6142e0483f54818690c99600")
```

#### Sample data

```json
{
  "message": "Set the main department success",
  "code": 200
}
```

## Organization synchronization

> Organization synchronization

```python
def start_sync(self, provider_type, ad_connector_id=None)
```

#### parameter

- `provider_type` \<str\> Supplier type
- `ad_connector_id` \<str\> connect ID

#### Example

```python
management.org.start_sync(provider_type="dingtalk")
```
