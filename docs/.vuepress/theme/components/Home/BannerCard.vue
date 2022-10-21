<template>
  <div class="docs-banner">
    <div class="docs-banner-card">
      <h1>{{ title }}</h1>
      <p>{{ text }}</p>
      <authing-button class="button" @click="check"> 查看文档 </authing-button>
    </div>
    <img
      class="docs-banner-img"
      :src="require(`@theme/assets/images/banner-img.svg`)"
      alt=""
    />
  </div>
</template>
<script>
import AuthingButton from "@theme/components/AuthingButton/index.vue";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  components: {
    AuthingButton,
  },
  methods: {
    check() {
      window.location.href = this.url;
    },
  },
};
</script>
<style lang="scss" scoped>
$color: #215ae5;
.docs-banner {
  background-color: $color;
  border-radius: 4px;
  color: #ffffff;
  display: flex;
  background-image: url(../../assets/images/banner-bg.png);
  background-repeat: no-repeat;
  background-size: auto 100%;
  &-card {
    padding: 36px 20px 42px 68px;
    h1 {
      margin: 12px 0;
    }
    p {
      margin: 0;
      line-height: 22px;
      font-size: 14px;
    }
    .button {
      margin-top: 24px;
      height: 32px;
      line-height: 32px;
      padding: 0;
      min-width: 88px;
      background: #ffffff;
      color: $color;
      border: none;
    }
  }
}

@media (max-width: 1000px) {
  .docs-banner-card {
    padding-left: 20px;
  }
  .docs-banner-img {
    display: none;
  }
}
</style>

