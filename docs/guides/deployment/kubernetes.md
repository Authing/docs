# Kubernetes 部署模式

<LastUpdated/>

## 概述

Authing 不会改变用户已有的云基础设施，Authing 只会最大程度去兼容用户的云环境。因此，Authing 提出了「云中立」和「Authing Inside」的概念。在多云环境下 Authing 可以保持其中立的特性，可以部署不论是 AWS、腾讯云、阿里云还是私有云环境。在混合云或者私有云环境下，Authing 都会像 Intel 一样被集成在客户的 IT 系统中。

本文将介绍 Authing IDaaS 平台基于 Kubernetes 的部署方案以及具体的操作指导。

## 整体架构

<img src="./images/k8s-1.png" style="margin-top: 20px;" class="md-img-padding" />
<div style="height: 10px;"></div>

Authing IDaaS 平台的高可用架构是运行在 VPC（虚拟私有云）中，通过 LB（负载均衡），将添加的同一地域的多可用区虚拟成一个高性能和高可用的服务池，并根据负载均衡规则，将来自客户端的请求分发给服务池中的可用区。

<img src="./images/k8s-2.png" style="margin-top: 20px;" class="md-img-padding" />
<div style="height: 10px;"></div>

每个可用区由一组 Kubernetes Node 组成，每个可用区都搭载一套完整的 Authing IDaaS 平台，IDaaS 集群为无状态服务，数据库集群为有状态的主从同步架构，若某个可用区出现服务故障或服务不可用，则 LB 会将流量转移至另一个可用的可用区，该可用区将会承担起 Master 的作用。

负载均衡会实时检测每个可用区的健康状态，自动隔离异常状态的可用区，从而提高了应用的整体服务能力。

## 部署方案

**1. 组件规划**

|                         服务器                         |                            组件包                            |                          功能说明                           |
| :----------------------------------------------------: | :----------------------------------------------------------: | :---------------------------------------------------------: |
| ElasticSearch<img width=180 class="md-table-padding"/> | elasticsearch-7.7.0<img width=180 class="md-table-padding"/> | 搜索引擎、日志服务<img width=180 class="md-table-padding"/> |
|                     Authing Server                     |                     authing-server-1.2.0                     |                       Authing 主服务                        |
|                         Redis                          |                         redis-4.0.0                          |                          缓存服务                           |
|                       PostgreSQL                       |                        postgres-12.5                         |                         数据库服务                          |
|                        Logstash                        |                        logstash-7.7.0                        |                     日志收集、分析服务                      |
|                       JDBC-River                       |                  jdbc-logstash-river:1.0.0                   |                        后台数据服务                         |
|                      Staticfiles                       |                  authing-staticfiles:1.0.0                   |                        静态资源服务                         |

**2. 系统环境要求**

软件安装、配置和调测过程中，需要准备一个 Kubernetes 集群，集群要求如下：

Kubernetes 版本要求：

| 项目 <img width=350 class="md-table-padding"/> | 版本 <img width=530 class="md-table-padding"/> |
| :--------------------------------------------: | :--------------------------------------------: |
|                 Client Version                 |                 v1.19.4 及以上                 |
|                 Server Version                 |                 v1.18.3 及以上                 |

Docker 版本要求：

| 项目 <img width=350 class="md-table-padding"/> | 版本 <img width=530 class="md-table-padding"/> |
| :--------------------------------------------: | :--------------------------------------------: |
|                     Client                     |                19.03.14 及以上                 |
|                     Server                     |                19.03.14 及以上                 |

操作系统环境要求：
| 项目 <img width=180 class="md-table-padding"/> | 最低配置 <img width=180 class="md-table-padding"/> | 推荐配置 <img width=180 class="md-table-padding"/> |
| :----: | :----: | :----: |
| 操作系统平台 | linux/amd64 | - |
| 内核版本 | linux 3.10.0 及以上 | - |

Kubernetes Master 节点配置要求：
| 项目 <img width=180 class="md-table-padding"/> | 最低配置 <img width=180 class="md-table-padding"/> | 推荐配置 <img width=180 class="md-table-padding"/> |
| :----: | :----: | :----: |
| CPU | X86 64 位 2 核 | X86 64 位 4 核
| 内存 | 8 GB 及以上 | 16 GB 及以上
| 硬盘 | 500 GB | 1 TB
| 内网带宽 | 1 Gbps | 10 Gbps

Kubernetes Worker 节点配置要求：
| 项目 <img width=180 class="md-table-padding"/> | 最低配置 <img width=180 class="md-table-padding"/> | 推荐配置 <img width=180 class="md-table-padding"/> |
| :----: | :----: | :----: |
| CPU | X86 64 位 4 核 | X86 64 位 8 核
| 内存 | 16 GB 及以上 | 32 GB 及以上
| 硬盘 | 1 TB | 5 TB
| 内网带宽 | 1 Gbps | 10 Gbps

**3. 相关文档**

| 名称 <img width=350 class="md-table-padding"/> | 说明 <img width=350 class="md-table-padding"/> |
| :--------------------------------------------: | :--------------------------------------------: |
|   《Authing IDaaS 平台使用指南 1.2.0 版本》    |        介绍 Authing IDaaS 平台操作指导         |
|   《Authing IDaaS 平台产品文档 1.2.0 版本》    |        介绍 Authing IDaaS 平台产品功能         |

**注：以上资源请联系售前人员获取**

**4. 镜像安装包**

|   名称 <img width=350 class="md-table-padding"/>   | 说明 <img width=350 class="md-table-padding"/> |
| :------------------------------------------------: | :--------------------------------------------: |
| authing-jdbc-logstash-river-1.0.0-90875fa84d87.tar |           Authing 后端数据服务镜像包           |
|       authing-server-1.2.0-32d8b4130bae.tar        |              Authing 主服务镜像包              |
|     authing-staticfiles-1.0.0-a70a58e3c115.tar     |               静态资源服务镜像包               |
|        elasticsearch-7.7.0-7ec4f35ab452.tar        |            搜索、数据统计服务镜像包            |
|          logstash-7.7.0-30dcca1db5e9.tar           |            日志收集、分析服务镜像包            |
|           postgres-12.5-386fd8c60839.tar           |                数据库服务镜像包                |
|            redis-4.0.0-3189e099eb0f.tar            |                 缓存服务镜像包                 |

**注：以上资源请联系售前人员获取**

**5. 编排文件**

| 名称 <img width=350 class="md-table-padding"/> | 说明 <img width=350 class="md-table-padding"/> |
| :--------------------------------------------: | :--------------------------------------------: |
|                 namespace.yaml                 |                命名空间编排文件                |
|  Authing-jdbc-logstash-river-deployment.yaml   |          Authing 后端数据服务编排文件          |
|        authing-server--deployment.yaml         |             Authing 主服务编排文件             |
|      Authing-staticfiles-deployment.yaml       |              静态资源服务编排文件              |
|         elasticsearch-deployment.yaml          |           搜索、数据统计服务编排文件           |
|            logstash-deployment.yaml            |           日志收集、分析服务编排文件           |
|            postgres-deployment.yaml            |               数据库服务编排文件               |
|             redis-deployment.yaml              |                缓存服务编排文件                |

**注：以上资源请联系售前人员获取**
