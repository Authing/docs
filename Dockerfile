FROM docker-images.authing-inc.co/build-cache/docs AS build-stage
WORKDIR /build
COPY . .
RUN ln -s /tmp/node_modules /build \
    && yarn install --cache-folder $(yarn cache dir) \
    && NODE_OPTIONS="--max_old_space_size=$(grep MemAvailable /proc/meminfo | awk '{print $2/1024}')" \
    && yarn docs:build

FROM docker-images.authing-inc.co/base-images/nginx:1.25.2-alpine
WORKDIR /docs
COPY --from=build-stage /build/.vuepress/dist .
COPY --from=build-stage /build/.vuepress/dist ./v2
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
