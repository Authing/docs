<template>
  <div class="share">
    <v-popover placement="bottom-end">
      <button class="share-btn">
        <svg
          class="share-icon"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8333 11.6667H9.16667C7.79967 11.6661 6.45853 12.0393 5.28823 12.7458C4.11793 13.4522 3.163 14.4651 2.52667 15.675C2.50878 15.4504 2.49989 15.2253 2.5 15C2.5 10.3975 6.23083 6.66667 10.8333 6.66667V2.5L19.1667 9.16667L10.8333 15.8333V11.6667Z"
            fill="#215AE5"
          />
        </svg>

        {{ this.$themeLocaleConfig.share.share }}
      </button>

      <template slot="popover">
        <div class="share-content">
          <button class="share-btn" @click="onCopyLink">
            <svg
              class="share-icon"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.70684 5.40666L9.65017 6.34999C10.0836 6.78334 10.4273 7.29781 10.6619 7.86403C10.8965 8.43024 11.0172 9.03712 11.0172 9.64999C11.0172 10.2629 10.8965 10.8697 10.6619 11.436C10.4273 12.0022 10.0836 12.5166 9.65017 12.95L9.41417 13.1853C8.53896 14.0605 7.35191 14.5522 6.11417 14.5522C4.87643 14.5522 3.68939 14.0605 2.81417 13.1853C1.93896 12.3101 1.44727 11.1231 1.44727 9.88533C1.44727 8.64759 1.93896 7.46054 2.81417 6.58533L3.7575 7.52866C3.44575 7.83769 3.19811 8.20526 3.02879 8.61026C2.85947 9.01526 2.77182 9.44972 2.77086 9.88868C2.76989 10.3276 2.85565 10.7625 3.02319 11.1682C3.19073 11.574 3.43676 11.9426 3.74716 12.253C4.05756 12.5634 4.42621 12.8094 4.83194 12.977C5.23768 13.1445 5.67251 13.2303 6.11148 13.2293C6.55045 13.2283 6.9849 13.1407 7.3899 12.9714C7.7949 12.8021 8.16247 12.5544 8.4715 12.2427L8.7075 12.0067C9.33241 11.3816 9.68346 10.5339 9.68346 9.64999C9.68346 8.76611 9.33241 7.91842 8.7075 7.29332L7.76417 6.34999L8.7075 5.40733L8.70684 5.40666ZM13.1855 9.41399L12.2428 8.47133C12.5546 8.16229 12.8022 7.79472 12.9716 7.38972C13.1409 6.98472 13.2285 6.55027 13.2295 6.1113C13.2304 5.67233 13.1447 5.2375 12.9772 4.83176C12.8096 4.42603 12.5636 4.05738 12.2532 3.74698C11.9428 3.43658 11.5741 3.19055 11.1684 3.02301C10.7627 2.85547 10.3278 2.76972 9.88886 2.77068C9.44989 2.77164 9.01544 2.85929 8.61044 3.02861C8.20544 3.19793 7.83787 3.44557 7.52884 3.75733L7.29284 3.99333C6.66793 4.61842 6.31688 5.46611 6.31688 6.34999C6.31688 7.23387 6.66793 8.08157 7.29284 8.70666L8.23617 9.64999L7.29284 10.5927L6.35017 9.64999C5.91678 9.21665 5.57299 8.70218 5.33844 8.13596C5.10389 7.56974 4.98317 6.96287 4.98317 6.34999C4.98317 5.73712 5.10389 5.13024 5.33844 4.56403C5.57299 3.99781 5.91678 3.48334 6.35017 3.04999L6.58617 2.81466C7.46138 1.93944 8.64843 1.44775 9.88617 1.44775C11.1239 1.44775 12.311 1.93944 13.1862 2.81466C14.0614 3.68987 14.5531 4.87692 14.5531 6.11466C14.5531 7.3524 14.0614 8.53944 13.1862 9.41466L13.1855 9.41399Z"
                fill="#215AE5"
              />
            </svg>

            {{ this.$themeLocaleConfig.share.copyLink }}
          </button>
        </div>
      </template>
    </v-popover>

    <div
      class="share-content"
      v-if="copied"
      style="position: absolute; width: 126px"
    >
      <button class="share-btn">
        <svg class="share-icon" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
            fill="rgba(30,183,109,1)"
          />
        </svg>

        {{ this.$themeLocaleConfig.share.copied }}
      </button>
    </div>
  </div>
</template>

<script>
import IconFont from "@theme/components/IconFont/index.vue";

export default {
  components: {
    IconFont,
  },
  data() {
    return { copied: false };
  },
  methods: {
    async onCopyLink() {
      await this.$copyText(window.location.href);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1000);
    },
  },
};
</script>

<style lang="stylus" scoped>
.share
  position relative

.share-btn
  border: 0;
  background: none;
  cursor: pointer;
  margin-right: 20px
  line-height 20px
  font-size 14px

.share-icon
  width 20px
  height 20px
  display: inline-block;
  vertical-align: bottom;

.share-content
  color: #1D2129;
  width 155px
  padding: 8px 10px
  border-radius 4px
  border: 1px solid #E5E6EB;
  background: #fff
  word-break: break-word
  wrap: break-word
</style>
