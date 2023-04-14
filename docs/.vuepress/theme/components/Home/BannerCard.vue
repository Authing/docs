<template>
    <swiper ref="mySwiper" :options="swiperOptions" :pagination="{ clickable: true }">
      <swiper-slide v-for="(item, index) in banners" :key="index" class="docs-banner" :style="{backgroundImage: `url(${item.background})`}">
        <div class="docs-banner-card">
          <h1>{{ item.title }}</h1>
          <p>{{ item.text }}</p>
          <authing-button class="button" @click="check(item)">
            {{ item.btnText }}
          </authing-button>
        </div>
        <img
          class="docs-banner-img"
          :src="item.icon"
          alt=""
        />
      </swiper-slide>
      <div class="swiper-pagination banner-swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
import AuthingButton from "@theme/components/AuthingButton/index.vue";
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
export default {
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  components: {
    AuthingButton,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: true,
        speed: 600,
        // delay: 6000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  methods: {
    check(item) {
      if (item.open) {
        window.open(item.url);
      } else {
        window.location.href = item.url;
      }
    }
  },
};
</script>
<style lang="scss">
$color: #215ae5;
.docs-banner {
  background-color: $color;
  border-radius: 4px;
  color: #ffffff;
  display: flex;
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
      min-height: 44px;
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

.banner-swiper-pagination {
  span {
    width: 6px;
    height: 6px;
    background-color: #ffffff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    width: 20px;
    border-radius: 7px;
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

