<template>
  <div class="newBarWrap" v-if="$themeConfig.isInConsoleAppDetail">
    <p class="newBarTitle">快速开始</p>
    <p class="newBarDesc">
      本教程演示如何快速集成用户登录到你的应用程序。我们会根据你的账户信息做定制化信息呈现。
    </p>
    <div class="anchorWrap">
      <a
        class="anchorContent"
        v-for="(item, index) in $page.fullHeaders[0].children"
        :key="index"
        :href="
          resolvePath({
            path: item.path || undefined,
            hash: !item.path && '#' + item.slug,
            query: $route.query
          })
        "
      >
        <span class="anchorCircle">{{ index + 1 }}</span>
        <span class="anchorTitle">{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppDetailSiderBar",
  computed: {},
  methods: {
    resolvePath(path) {
      return this.$router.resolve(path).href;
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.newBarWrap {
  background: #f8f8f9;
  border-radius: 4px;
  padding: 30px 48px;
  .newBarTitle {
    font-weight: 500;
    font-size: 24px;
    color: #1d2129;
    margin-top: 0;
    margin-bottom: 8px;
  }
  a {
    text-decoration: none !important;
  }
  .newBarDesc {
    font-weight: 400;
    font-size: 12px;
    color: #86909c;
    margin-bottom: 22px;
  }
  .anchorWrap {
    display: flex;
    flex-flow: wrap;
    .anchorContent {
      margin-right: 32px;
      margin-bottom: 12px;
      cursor: pointer;
    }
    .anchorCircle {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: #1eb76d;
      border-radius: 50%;
      color: #fff;
      font-size: 10px;
      text-align: center;
      line-height: 16px;
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
    }
    .anchorTitle {
      font-size: 14px;
      color: #1d2129;
    }
  }
}
</style>
