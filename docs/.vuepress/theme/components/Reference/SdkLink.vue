<template>
  <div class="sdk-link">
    <div>
      <img :src="require(`@theme/assets/images/reference/${item.icon}.svg`)" />
    </div>
    <div class="title">
      {{ item.title }}
    </div>
    <div class="github">
      <a :href="item.github || '#'">
        <img :src="require(`@theme/assets/images/reference/github.svg`)" />
        Github
      </a>
    </div>
    <div class="docs">
      <a :href="item.doc || '#'">
        <img :src="require(`@theme/assets/images/reference/docs.svg`)" />
        {{ $localeConfig.devDocText }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SdkLink",

  props: {
    item: {
      required: true,
    },
  },
};
</script>

<style lang="stylus">
.sdk-link
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 72px;
  border-bottom: 1px solid #eee;
  .title
    flex: 1;
    padding: 0 1em;
    font-weight: 500;
    font-size: 16px;
  img
    width: 40px;
    height: 40px;
  a
    line-height: 20px;
    color: #000;
    padding: 0 1em;
    img
      height: 20px;
      width: 20px;
      display: inline-block;
      vertical-align: bottom;
    &[href="#"]
      color: #C9CDD4
      cursor: not-allowed
      img
        filter: grayscale(1);
</style>
