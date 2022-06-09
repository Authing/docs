<template>
  <div class="directory">
    <div
      v-for="(item, index) in directoryList"
      class="directory-item"
      :key="index"
      @click="
          () => {
            $router.push(`/${item.link}`);
          }
        "
    >
      <div class="header">
        <img
          width="24px"
          height="24px"
          :alt="item.name"
          :src="
              require(`@theme/assets/images/sdk-icons/${
                item.img
              }`)
            "
        />
        <span class="span-name">{{ item.name }}</span>
      </div>
      <IconFont type="authing-jinru" style="font-size: 12px" class="item-language-icon" />
    </div>
  </div>
</template>

<script>
import IconFont from "@theme/components/IconFont/index.vue";

export default {
  name: "Directory",
  components: {
    IconFont
  },
  computed: {
    directoryList() {
      return this.$frontmatter.directoryList;
    }
  }
};
</script>

<style  lang="stylus">
.directory {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 26px 0;
  border-radius: 4px;
  box-shadow 0 4px 22px rgba(159, 159, 175, 0.15)

  .directory-item:first-child {
    margin-top: 0;
  }

  .directory-item {
    padding: 0 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 26px;
    cursor: pointer;

    .header {
      display: flex;
      align-items: center;

      img {
        border: 0px
      }

      .span-name {
        margin-left: 16px;
        font-size: 16px;
        font-weight: bold;
        line-height: 9px;
        color: #333333;
        opacity: 1;
      }
    }

    .language-tag {
      width: 62px;
      height: 21px;
      background: #F0F0F0;
      opacity: 1;
      border-radius: 4px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
    }
  }

}
</style>