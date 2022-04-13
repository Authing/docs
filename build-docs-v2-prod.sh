#!/bin/bash
# 本地 build 文档并上传 docker 仓库和 OSS
./.env
VERSION=$(cat version.txt)
PUBLIC_URL=//cdn.authing.co/authing-docs-v2/${VERSION}/
OSS_URL=authing-cdn-cn-prod
OSS_REGION=oss-cn-beijing.aliyuncs.com
# 构建文档
PUBLIC_URL=$PUBLIC_URL yarn docs:build
# 上传产物到 docker
docker build -t authing:docs-new .
docker login -u ${DOCKER_REPO_USERNAME} -p ${DOCKER_REPO_PASSWORD} ${DOCKER_REPO_HOST}
docker tag authing:docs-new registry.cn-beijing.aliyuncs.com/authing-next/authing-docs-v2:${VERSION}
docker push registry.cn-beijing.aliyuncs.com/authing-next/authing-docs-v2:${VERSION}
# 上传静态文件到 OSS
ossutil --access-key-id ${ALIYUN_ACCESS_KEY} --access-key-secret ${ALIYUN_ACCESS_KEY_SECRET} -e ${OSS_REGION} cp -r -f docs/.vuepress/dist oss://${OSS_URL}/authing-docs-v2/${VERSION}/
echo "完成"
