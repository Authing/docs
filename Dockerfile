# FROM node:12.14.0 as PATH_IMAGE
# ENV NODE_OPTIONS=--max_old_space_size=5120
# WORKDIR /app
# COPY package.json .
# RUN yarn --registry https://registry.npm.taobao.org/
# COPY . .
# RUN npm run docs:build

FROM nginx:alpine
COPY docs/.vuepress/dist /docs
COPY docs/.vuepress/dist /docs/v2
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 
